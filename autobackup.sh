FILENAME=/backup/$(date "+%Y%m%d_%H%M%S").sql

sudo docker exec database sh -c 'mysqldump -uroot -p"root" wallet' > ./${FILENAME}
exit
