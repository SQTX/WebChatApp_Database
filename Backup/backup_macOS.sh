#!/bin/bash
PGPASSWORD=fsfer4!sc?loPS0 pg_dump --username=postgres --host=localhost --dbname=new_db_project --file=C:\Users\konra\PhpstormProjects\WebChatApp_Database_new\backup\backup_file.sql --schema=public -W
0 2 * * * C:\Users\konra\PhpstormProjects\WebChatApp_Database_new\backup\backup_macOS.sh
