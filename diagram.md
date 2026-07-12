# NutriTrack System Diagrams

This document collects the main diagrams for NutriTrack in one place. The styling is intentionally clean and health-focused, with a green-and-gold palette that matches the product's nutrition and family-care theme.

## 1. Block Diagram

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, Segoe UI, Arial, sans-serif",
    "primaryColor": "#E8F5F1",
    "primaryTextColor": "#14322E",
    "primaryBorderColor": "#3A7D6D",
    "lineColor": "#6B7D78",
    "secondaryColor": "#FFF4D6",
    "tertiaryColor": "#F7FAF9",
    "clusterBkg": "#F5FBF9",
    "clusterBorder": "#B8D6CF",
    "background": "transparent"
  },
  "flowchart": { "curve": "basis" }
}}%%
flowchart TB
  User([Parent / Guardian])

  subgraph Client[Client Layer]
    Web["Frontend App\nReact + Vite + Capacitor"]
  end

  subgraph App[Application Layer]
    Routes["Express Routes"]
    Auth["Auth Middleware"]
    Controllers["Controllers\nAuth, Baby, Growth, Reminder, Profile, Vaccine, Food, Feeding, Document, Milestone, Feeding Log"]
  end

  subgraph Data[Data Layer]
    Models["Sequelize Models"]
    Database[("SQLite / MySQL")]
  end

  subgraph Content[Reference Content]
    Static["Static Nutrition and Vaccine Content"]
    Feeds["Feeding Guidance"]
    Foods["Food Library"]
    Vaccines["Vaccine Schedule"]
    Docs["Uploaded Baby Documents"]
  end

  User --> Web
  Web -->|REST / JSON| Routes
  Routes --> Auth
  Auth --> Controllers
  Controllers --> Models
  Models --> Database
  Controllers --> Static
  Static --> Feeds
  Static --> Foods
  Static --> Vaccines
  Controllers --> Docs

  classDef actor fill:#FFF4D6,stroke:#B08A1F,color:#4A3700,stroke-width:1.5px;
  classDef client fill:#E8F5F1,stroke:#3A7D6D,color:#14322E,stroke-width:1.5px;
  classDef app fill:#F5FBF9,stroke:#7DB3A6,color:#183B35,stroke-width:1.2px;
  classDef data fill:#EEF3F2,stroke:#6B7D78,color:#20312F,stroke-width:1.2px;
  classDef content fill:#FFF9EA,stroke:#D4A72C,color:#4A3A06,stroke-width:1.2px;

  class User actor;
  class Web client;
  class Routes,Auth,Controllers app;
  class Models,Database data;
  class Static,Feeds,Foods,Vaccines,Docs content;
```

## 2. Use Case Diagram

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, Segoe UI, Arial, sans-serif",
    "primaryColor": "#E8F5F1",
    "primaryTextColor": "#14322E",
    "primaryBorderColor": "#3A7D6D",
    "lineColor": "#6B7D78",
    "secondaryColor": "#FFF4D6",
    "tertiaryColor": "#F7FAF9",
    "background": "transparent",
    "clusterBkg": "#F5FBF9",
    "clusterBorder": "#B8D6CF"
  }
}}%%
flowchart LR
  Parent([Parent / Guardian])
  Pregnant([Pregnant User])
  Partner([Partner])

  subgraph System[NutriTrack System]
    direction TB
    UC1([Register or sign in])
    UC2([Select user journey])
    UC3([Manage baby profile])
    UC4([Track growth and feeding])
    UC5([Review guidance and documents])
    UC6([Set and complete reminders])
  end

  Parent --> UC1
  Parent --> UC2
  Parent --> UC3
  Parent --> UC4
  Parent --> UC5
  Parent --> UC6
  Pregnant --> UC1
  Pregnant --> UC2
  Pregnant --> UC5
  Partner --> UC1

  classDef actor fill:#FFF4D6,stroke:#B08A1F,color:#4A3700,stroke-width:1.6px;
  classDef usecase fill:#F5FBF9,stroke:#3A7D6D,color:#183B35,stroke-width:1.2px;

  class Parent,Pregnant,Partner actor;
  class UC1,UC2,UC3,UC4,UC5,UC6 usecase;
```

## 3. State Chart Diagram

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, Segoe UI, Arial, sans-serif",
    "primaryColor": "#E8F5F1",
    "primaryTextColor": "#14322E",
    "primaryBorderColor": "#3A7D6D",
    "lineColor": "#6B7D78",
    "secondaryColor": "#FFF4D6",
    "tertiaryColor": "#F7FAF9",
    "background": "transparent"
  },
  "state": { "nodeSpacing": 48, "rankSpacing": 64 }
}}%%
stateDiagram-v2
  direction LR
  [*] --> LoggedOut

  LoggedOut --> Onboarding: open app
  Onboarding --> StageSelect: continue
  StageSelect --> Dashboard: choose journey and sign in
  Dashboard --> LoggedOut: sign out

  state "Baby Profile" as BabyProfile
  state "Growth Record" as GrowthRecord
  state "Feeding Log" as FeedingLog
  state "Documents" as Documents
  state "Reminders" as Reminders
  state "Guidance" as Guidance

  Dashboard --> BabyProfile: update baby
  Dashboard --> GrowthRecord: add record
  Dashboard --> FeedingLog: log feeding
  Dashboard --> Documents: upload or review
  Dashboard --> Reminders: manage reminder
  Dashboard --> Guidance: view info

  BabyProfile --> Dashboard: save
  GrowthRecord --> Dashboard: save
  FeedingLog --> Dashboard: save
  Documents --> Dashboard: close
  Reminders --> Dashboard: save
  Guidance --> Dashboard: close

  classDef stateNode fill:#F5FBF9,stroke:#3A7D6D,color:#183B35,stroke-width:1.2px,rx:8,ry:8;
  classDef dashboardNode fill:#E8F5F1,stroke:#2F6F60,color:#14322E,stroke-width:1.5px,rx:10,ry:10;

  class LoggedOut,Onboarding,StageSelect,BabyProfile,GrowthRecord,FeedingLog,Documents,Reminders,Guidance stateNode;
  class Dashboard dashboardNode;
```

## 4. Class Diagram

```mermaid
classDiagram
direction LR

class User {
  +int id
  +string email
  +string hashed_password
  +string full_name
  +string due_date
  +string user_type
  +string baby_date_of_birth
  +string phone_number
  +string profile_image
  +string provider
  +string provider_id
}

class Baby {
  +int id
  +int user_id
  +string name
  +date date_of_birth
  +string gender
  +float weight_at_birth_kg
  +float height_at_birth_cm
  +string blood_type
  +text allergies
  +text notes
  +boolean is_active
}

class GrowthRecord {
  +int id
  +int user_id
  +int baby_id
  +date date
  +int age_months
  +float weight_kg
  +float height_cm
}

class Reminder {
  +int id
  +int user_id
  +int baby_id
  +string title
  +string reminder_date
  +string type
  +boolean completed
  +string status
  +string recipient
  +int dose_number
  +int total_doses
}

class EmergencyContact {
  +int id
  +int user_id
  +string name
  +string phone
  +string relationship
}

class Partner {
  +int id
  +int user_id
  +string partner_email
  +int partner_id
  +string status
}

class Vaccine {
  +int id
  +string name
  +string emoji
  +text description
  +int total_doses
  +string recipient_type
  +boolean recommended
}

class Feeding {
  +int id
  +string title
  +string emoji
  +string age_group
  +int age_months_min
  +int age_months_max
  +string type
  +string frequency
  +string amount
}

class Food {
  +int id
  +string name
  +string category
  +string type
  +string trimester
  +string diet_type
  +json nutrients
  +boolean is_recommended
}

class DevelopmentMilestone {
  +int id
  +int baby_id
  +string milestone_name
  +string milestone_key
  +int expected_age_months
  +boolean completed
  +date completed_date
}

class BabyDocument {
  +int id
  +int baby_id
  +string category
  +string document_name
  +string stored_file_name
  +string file_path
  +string mime_type
  +int file_size
}

class FeedingLog {
  +int id
  +int user_id
  +int baby_id
  +string feeding_type
  +string food_name
  +float quantity
  +string quantity_unit
  +date date
  +time time
}

User "1" --> "many" Baby
User "1" --> "many" GrowthRecord
User "1" --> "many" Reminder
User "1" --> "many" FeedingLog
User "1" --> "1" EmergencyContact
User "1" --> "many" Partner
Baby "1" --> "many" GrowthRecord
Baby "1" --> "many" Reminder
Baby "1" --> "many" DevelopmentMilestone
Baby "1" --> "many" BabyDocument
Baby "1" --> "many" FeedingLog
GrowthRecord --> User
Reminder --> User
Reminder --> Baby
DevelopmentMilestone --> Baby
BabyDocument --> Baby
FeedingLog --> User
FeedingLog --> Baby
```

## 5. API Flow Sequence

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Frontend
  participant API as Backend
  participant DB as Database
  U->>UI: Open protected page
  UI->>API: GET /api/babies
  API->>API: Validate token and permissions
  API->>DB: Query babies for user
  DB-->>API: Baby rows
  API-->>UI: JSON response
  UI->>UI: Render dashboard cards and selected baby state
```
