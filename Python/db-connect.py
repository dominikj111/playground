# https://github.com/mysql/mysql-connector-python
import mysql.connector
import os


folderDownload = ""


config = {
    'user': 'admin',
    'password': '-----',
    'host': '127.0.0.1',
    'raise_on_warnings': True
}

cnx = mysql.connector.connect(**config)

cursor = cnx.cursor()


cursor.execute("SHOW DATABASES;")

for (db_name) in cursor:
  print("|{}|".format(db_name))

cursor.close()
cnx.close()

# def create_database(cursor):
#     try:
#         cursor.execute(
#             "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
#     except mysql.connector.Error as err:
#         print("Failed creating database: {}".format(err))
#         exit(1)

# try:
#     cursor.execute("USE {}".format(DB_NAME))
# except mysql.connector.Error as err:
#     print("Database {} does not exists.".format(DB_NAME))
#     if err.errno == errorcode.ER_BAD_DB_ERROR:
#         create_database(cursor)
#         print("Database {} created successfully.".format(DB_NAME))
#         cnx.database = DB_NAME
#     else:
#         print(err)
#         exit(1)


cnx.close()
