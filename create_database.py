import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_database():
    """Create the holidaybrew database if it doesn't exist"""
    
    # Connection parameters for postgres default database
    db_params = {
        'host': 'localhost',
        'port': 5432,
        'user': 'postgres',
        'password': 'keshav_s1206',
        'database': 'postgres'  
    }
    
    database_name = 'holidaybrew'
    
    try:
        print(f"🔌 Connecting to PostgreSQL server...")
        # Connect to PostgreSQL server
        conn = psycopg2.connect(**db_params)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(
            "SELECT 1 FROM pg_database WHERE datname = %s",
            (database_name,)
        )
        
        exists = cursor.fetchone()
        
        if exists:
            print(f"✅ Database '{database_name}' already exists!")
        else:
            print(f"📦 Creating database '{database_name}'...")
            cursor.execute(f'CREATE DATABASE {database_name}')
            print(f"✅ Database '{database_name}' created successfully!")
        
        cursor.close()
        conn.close()
        
        print("\n🎉 Database setup complete!")
        print("You can now run: uvicorn main:app --reload")
        
        return True
        
    except psycopg2.Error as e:
        print(f"❌ Error: {e}")
        print("\n💡 Troubleshooting:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check your username and password")
        print("3. Verify PostgreSQL is listening on port 5432")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🎄 Holiday Brew - Database Setup")
    print("=" * 60)
    print()
    
    success = create_database()
    
    if not success:
        print("\n⚠️  Database creation failed. Please fix the errors and try again.")
        exit(1)
    
    print("\n" + "=" * 60)
    print("Next steps:")
    print("1. Run: uvicorn main:app --reload")
    print("2. Visit: http://localhost:8000/docs")
    print("=" * 60)