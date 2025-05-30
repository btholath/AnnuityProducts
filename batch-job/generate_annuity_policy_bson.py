from bson import BSON
import json

policies = json.load(open("annuity_policies.json"))
with open("annuity_policies.bson", "wb") as f:
    f.write(BSON.encode({"policies": policies}))
