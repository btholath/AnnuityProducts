
## Prerequisites
Ubuntu 24.04 LTS
VS Code

## MongoDB setup
# Step 1: Import the MongoDB GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Step 2: Add the MongoDB APT repository
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Step 3: Update package list and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Step 4: Start MongoDB service manually (WSL does not auto-start it)
sudo mkdir -p /data/db
sudo chown -R `id -u` /data/db
mongod --dbpath /data/db

### Note: if you are trying to setup within WSL Ubuntu, then bypass unix socket by using TCP only

sudo mkdir -p /var/log/mongodb
sudo touch /var/log/mongodb/mongod.log
sudo chown -R $USER /var/log/mongodb


nano ~/mongod.conf
systemLog:
  destination: file
  path: /home/bijut/mongod.log
  logAppend: true

storage:
  dbPath: /data/db

net:
  bindIp: 127.0.0.1
  port: 27017
  unixDomainSocket:
    enabled: false

Run the MongoDB using the above config
bijut@b:~/annuity_products/database$ mongod --config ~/mongod.conf

Install MongoDB shell (mongosh)
bijut@b:~/annuity_products/database$ sudo apt install -y mongodb-mongosh

bijut@b:~/annuity_products/database$ mongosh
Current Mongosh Log ID: 683891438671902fed61bb81
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0
Using MongoDB:          8.0.9
Using Mongosh:          2.5.0

test>

## Create life_insurance database with an annuity_policy collection

1. Create Your life_insurance Database & annuity_policies Collection

MongoDB script you can run directly inside mongosh to insert the annuity policy data.
test> use life_insurance;

db.annuity_policies.insertMany([
  {
    policy_number: "FA123456",
    type: "Fixed Annuity",
    customer: { name: "Alice Johnson", age: 55 },
    premium: 100000,
    interest_rate: 0.04,
    start_date: "2020-01-01",
    status: "Active"
  },
  {
    policy_number: "VA654321",
    type: "Variable Annuity",
    customer: { name: "Bob Smith", age: 60 },
    premium: 150000,
    sub_accounts: ["Equity Fund", "Bond Fund"],
    start_date: "2018-06-01",
    status: "Active"
  },
  {
    policy_number: "IA789012",
    type: "Indexed Annuity",
    customer: { name: "Carol Lee", age: 58 },
    premium: 120000,
    index: "S&P 500",
    cap_rate: 0.07,
    floor_rate: 0.01,
    start_date: "2019-03-01",
    status: "Lapsed"
  },
  {
    policy_number: "IM001122",
    type: "Immediate Annuity",
    customer: { name: "David Kim", age: 65 },
    premium: 90000,
    payout_frequency: "Monthly",
    payout_amount: 500,
    start_date: "2023-05-01",
    status: "Active"
  },
  {
    policy_number: "DF334455",
    type: "Deferred Annuity",
    customer: { name: "Emma Davis", age: 45 },
    premium: 70000,
    defer_until: "2040-01-01",
    start_date: "2024-01-01",
    status: "Pending"
  }
]);

test> show dbs
test> use life_insurance
life_insurance> show collections
life_insurance> db.annuity_policies.find().pretty()


## Enable Access Control, when planned to expose database to Mongoose or remote apps.
# Create a MongoDB user with access control
test> use admin

admin> db.createUser({
  user: "annuity_admin",
  pwd: "StrongPassword123!",
  roles: [ { role: "readWrite", db: "life_insurance" } ]
})

Restart MongoDB
bijut@b:~/annuity_products/database$ mongod --config ~/mongod.conf


Confirm MongoDB is up and running.
bijut@b:~/annuity_products/database$ ps aux | grep mongod
mongodb      199  0.5  1.5 3725324 256948 ?      SLsl May26  20:52 /usr/bin/mongod --config /etc/mongod.conf
bijut    1139728  0.0  0.0   4092  1968 pts/17   S+   10:33   0:00 grep --color=auto mongod
bijut@b:~/annuity_products/database$ 

## confirm you can log in via CLI with the credentials
mongosh -u annuity_admin -p 'StrongPassword123!' --authenticationDatabase admin
use life_insurance
db.annuity_policies.find().pretty()

