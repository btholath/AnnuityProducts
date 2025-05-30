from pymongo import MongoClient
from bson import json_util, ObjectId
import json

# Connect to MongoDB (local)
client = MongoClient("mongodb://localhost:27017/")
db = client["plant_monitor"]
collection = db["sensor_data"]

# Clear collection for clean demo
collection.delete_many({})

print("🚀 Connected to MongoDB\n")

# ----------------------------
# INSERT DOCUMENTS
# ----------------------------
doc1 = {
    "sensor_id": "S1",
    "moisture": 620,
    "location": "Kitchen",
    "timestamp": "2025-05-29T08:00:00Z"
}

doc2 = {
    "sensor_id": "S2",
    "moisture": 300,
    "location": "Garden",
    "timestamp": "2025-05-29T08:05:00Z"
}

collection.insert_one(doc1)
collection.insert_one(doc2)

print("✅ Inserted documents")


# ----------------------------
# FIND DOCUMENTS
# ----------------------------
print("\n🔍 All Documents:")
for doc in collection.find():
    print(doc)

print("\n🔍 Moisture > 500:")
for doc in collection.find({"moisture": {"$gt": 500}}):
    print(doc)
    
# ----------------------------
# UPDATE DOCUMENT
# ----------------------------
update_filter = {"sensor_id": "S1"}
update_action = {"$set": {"location": "Living Room"}}

collection.update_one(update_filter, update_action)
print("\n✅ Updated sensor S1 location")

# ----------------------------
# DELETE DOCUMENT
# ----------------------------
collection.delete_one({"sensor_id": "S2"})
print("🗑️ Deleted sensor S2")

# ----------------------------
# USE MONGO OPERATORS
# ----------------------------
collection.insert_many([
    {"sensor_id": "S3", "moisture": 450, "status": "ok"},
    {"sensor_id": "S4", "moisture": 200, "status": "dry"},
])

print("\n🔍 Documents with moisture in range (200-500):")
for doc in collection.find({"moisture": {"$gte": 200, "$lte": 500}}):
    print(doc)

# ----------------------------
# BSON vs JSON
# ----------------------------
example_doc = collection.find_one()
print("\n📦 BSON document (Python dict):")
print(example_doc)

print("\n🔄 Converted to JSON (for web):")
json_data = json.dumps(example_doc, default=json_util.default, indent=2)
print(json_data)

print("\n✅ Demonstration complete.")
    