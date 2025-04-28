import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import sys
import json
import os

# Read inputs from Node
grooming = float(sys.argv[1])
shedding = float(sys.argv[2])
energy = float(sys.argv[3])
trainability = float(sys.argv[4])
lifestyle = sys.argv[5]
home_type = sys.argv[6]
experience_level = sys.argv[7] 

# Normalize the input values from 1-5 to 0-1
def normalize_input(value):
    return (value - 1) / 4

grooming = normalize_input(grooming)
shedding = normalize_input(shedding)
energy = normalize_input(energy)
trainability = normalize_input(trainability)

# Load and clean the data
base_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(base_dir, "breed.csv")
df = pd.read_csv(csv_path, encoding="ISO-8859-1")
df = df.dropna()

# Size categorization
def categorize_size_by_home(home_type):
    home_type = home_type.lower()
    if home_type in ['apartment', 'condo']:
        return 'Small'
    elif home_type in ['townhouse', 'small house']:
        return 'Medium'
    else:
        return 'Large'

def categorize_size_by_height(max_height):
    if max_height <= 40:
        return 'Small'
    elif 40 < max_height <= 60:
        return 'Medium'
    else:
        return 'Large'

# Apply size categorization
df['size'] = df['max_height'].apply(categorize_size_by_height)

# Determine dog size based on home_type
dog_size = categorize_size_by_home(home_type)
filtered_df = df[df['size'] == dog_size]

# Features used for matching
features = [
    'grooming_frequency_value',
    'shedding_value',
    'energy_level_value',
    'trainability_value',
    'demeanor_value',
]

# Map lifestyle to demeanor_value
demeanor_value_map = {
    "active": 5,
    "moderate": 3,
    "sedentary": 1,
}

new_dog = {
    'grooming_frequency_value': grooming,
    'shedding_value': shedding,
    'energy_level_value': energy,
    'trainability_value': trainability,
    'demeanor_value': demeanor_value_map.get(lifestyle, 3),
}

# ✨ Boost trainability if first-time owner
if experience_level == "first-time":
    new_dog['trainability_value'] += 1
    if new_dog['trainability_value'] > 1:
        new_dog['trainability_value'] = 1  # Max cap

# Prepare data
X = filtered_df[features]
y = filtered_df['breed']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean')
knn.fit(X_scaled, y)

new_dog_df = pd.DataFrame([new_dog])
new_dog_scaled = scaler.transform(new_dog_df)

_, indices = knn.kneighbors(new_dog_scaled, n_neighbors=3)
matching_breeds = y.iloc[indices[0]].tolist()

# Output
print(json.dumps({"recommended_breeds": matching_breeds}))
