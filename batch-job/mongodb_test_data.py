from pymongo import MongoClient
from bson import json_util
import json

# Load JSON file (with 20 annuity records)
json_path = "annuity_policies.json"
with open(json_path, 'r') as file:
    annuity_policies = json.load(file)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["insurance_db"]
collection = db["annuity_policies"]

# Clear collection for clean demo
collection.delete_many({})
print("🚀 Connected to MongoDB and cleared existing data")

# Insert the loaded annuity policies
collection.insert_many(annuity_policies)
print(f"✅ Inserted {len(annuity_policies)} annuity policies")

# ----------------------------
# Read All Policies
# ----------------------------
print("\n📄 All Annuity Policies:")
for policy in collection.find():
    print(policy)

# ----------------------------
# Query: Active Policies Only
# ----------------------------
print("\n🔍 Active Policies:")
for policy in collection.find({"status": "Active"}):
    print(policy)

# ----------------------------
# Update Example: Change status of one policy
# ----------------------------
update_filter = {"policy_number": annuity_policies[0]["policy_number"]}
collection.update_one(update_filter, {"$set": {"status": "Lapsed"}})
print(f"\n✏️ Updated status of {annuity_policies[0]['policy_number']} to 'Lapsed'")

# ----------------------------
# Delete Example: Remove a specific policy
# ----------------------------
delete_filter = {"policy_number": annuity_policies[1]["policy_number"]}
collection.delete_one(delete_filter)
print(f"🗑️ Deleted policy {annuity_policies[1]['policy_number']}")

# ----------------------------
# BSON to JSON conversion
# ----------------------------
sample_doc = collection.find_one()
json_output = json.dumps(sample_doc, default=json_util.default, indent=2)

# Save converted JSON to file
json_output_path = "output_sample_policy.json"
with open(json_output_path, 'w') as out_file:
    out_file.write(json_output)

print(f"\n📦 Saved sample JSON policy to {json_output_path}")
