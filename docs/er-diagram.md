# SkillMatch AI — ER-диаграмма

## Дерекқордың мақсаты

MySQL дерекқоры пайдаланушылар, олардың дағдылары, бос жұмыс орындары және жұмысқа жіберілген өтінімдер туралы ақпаратты сақтайды.

## Дерекқор кестелері

### 1. users
Пайдаланушылар туралы ақпарат:
- id — пайдаланушының бірегей идентификаторы
- name — аты-жөні
- email — электрондық пошта
- password_hash — хэш түрінде сақталған құпиясөз
- role — пайдаланушы рөлі
- created_at — тіркелген күні

### 2. skills
Дағдылар тізімі:
- id — дағды идентификаторы
- name — дағды атауы

### 3. user_skills
Үміткердің дағдыларын сақтайды:
- user_id — пайдаланушы идентификаторы
- skill_id — дағды идентификаторы
- level — дағды деңгейі

### 4. jobs
Вакансиялар туралы ақпарат:
- id — вакансия идентификаторы
- employer_id — жұмыс берушінің идентификаторы
- title — вакансия атауы
- description — сипаттамасы
- location — жұмыс орны
- created_at — жарияланған күні

### 5. job_skills
Вакансияға қажетті дағдылар:
- job_id — вакансия идентификаторы
- skill_id — дағды идентификаторы
- is_required — дағдының міндетті екенін көрсетеді

### 6. applications
Жұмысқа жіберілген өтінімдер:
- id — өтінім идентификаторы
- candidate_id — үміткер идентификаторы
- job_id — вакансия идентификаторы
- status — өтінім мәртебесі
- created_at — өтінім жіберілген күн

## ER-диаграмма

```mermaid
erDiagram
    USERS ||--o{ USER_SKILLS : has
    SKILLS ||--o{ USER_SKILLS : includes
    USERS ||--o{ JOBS : publishes
    JOBS ||--o{ JOB_SKILLS : requires
    SKILLS ||--o{ JOB_SKILLS : contains
    USERS ||--o{ APPLICATIONS : submits
    JOBS ||--o{ APPLICATIONS : receives

    USERS {
        int id PK
        string name
        string email UK
        string password_hash
        string role
        datetime created_at
    }

    SKILLS {
        int id PK
        string name UK
    }

    USER_SKILLS {
        int user_id PK, FK
        int skill_id PK, FK
        string level
    }

    JOBS {
        int id PK
        int employer_id FK
        string title
        text description
        string location
        datetime created_at
    }

    JOB_SKILLS {
        int job_id PK, FK
        int skill_id PK, FK
        boolean is_required
    }

    APPLICATIONS {
        int id PK
        int candidate_id FK
        int job_id FK
        string status
        datetime created_at
    }