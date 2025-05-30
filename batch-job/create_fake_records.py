import json
import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

# Sample templates
sample_policies = [
    {
        "type": "Fixed Annuity",
        "fields": {"interest_rate": lambda: round(random.uniform(0.03, 0.06), 2)},
    },
    {
        "type": "Variable Annuity",
        "fields": {"sub_accounts": lambda: random.sample(["Equity Fund", "Bond Fund", "Money Market"], k=2)},
    },
    {
        "type": "Indexed Annuity",
        "fields": {
            "index": lambda: random.choice(["S&P 500", "NASDAQ", "Dow Jones"]),
            "cap_rate": lambda: round(random.uniform(0.05, 0.09), 2),
            "floor_rate": lambda: round(random.uniform(0.01, 0.03), 2),
        },
    },
    {
        "type": "Immediate Annuity",
        "fields": {
            "payout_frequency": lambda: "Monthly",
            "payout_amount": lambda: random.randint(400, 800),
        },
    },
    {
        "type": "Deferred Annuity",
        "fields": {
            "defer_until": lambda: (datetime.today() + timedelta(days=365 * random.randint(10, 30))).strftime("%Y-%m-%d")
        },
    }
]

statuses = ["Active", "Pending", "Lapsed", "Cancelled"]

generated_policies = []

for i in range(20):
    template = random.choice(sample_policies)
    customer = {
        "name": fake.name(),
        "age": random.randint(45, 70)
    }
    policy = {
        "policy_number": f"{template['type'][0:2].upper()}{random.randint(100000, 999999)}",
        "type": template["type"],
        "customer": customer,
        "premium": random.randint(60000, 200000),
        "start_date": (datetime.today() - timedelta(days=random.randint(30, 3650))).strftime("%Y-%m-%d"),
        "status": random.choice(statuses)
    }
    policy.update({k: v() for k, v in template["fields"].items()})
    generated_policies.append(policy)

# Save to JSON
output_path = "annuity_policies.json"
with open(output_path, "w") as f:
    json.dump(generated_policies, f, indent=2)

output_path
