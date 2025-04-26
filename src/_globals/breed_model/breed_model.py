import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import sys
import json

# Read inputs from Node
max_height = float(sys.argv[1])
grooming = float(sys.argv[2])
shedding = float(sys.argv[3])
energy = float(sys.argv[4])
trainability = float(sys.argv[5])

# Load and clean the data
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(base_dir, "breed.csv")
df = pd.read_csv(csv_path, encoding="ISO-8859-1")

df = df.dropna()

# Categorize size
def categorize_size(height):
    if height < 35:
        return 'Small'
    elif height <= 60:
        return 'Medium'
    else:
        return 'Large'

df['size'] = df['max_height'].apply(categorize_size)

features = [
    'grooming_frequency_value',
    'shedding_value',
    'energy_level_value',
    'trainability_value'
]

new_dog = {
    'max_height': max_height,
    'grooming_frequency_value': grooming,
    'shedding_value': shedding,
    'energy_level_value': energy,
    'trainability_value': trainability
}

dog_size = categorize_size(new_dog['max_height'])
filtered_df = df[df['size'] == dog_size]

X = filtered_df[features]
y = filtered_df['breed']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean')
knn.fit(X_scaled, y)

new_dog_df = pd.DataFrame([{
    'grooming_frequency_value': new_dog['grooming_frequency_value'],
    'shedding_value': new_dog['shedding_value'],
    'energy_level_value': new_dog['energy_level_value'],
    'trainability_value': new_dog['trainability_value']
}])
new_dog_scaled = scaler.transform(new_dog_df)


_, indices = knn.kneighbors(new_dog_scaled, n_neighbors=3)
matching_breeds = y.iloc[indices[0]].tolist()

# Output as JSON
print(json.dumps({"recommended_breeds": matching_breeds}))
