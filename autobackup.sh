FILENAME=$(date "+%Y%m%d_%H%M%S").sql

# 刪除7天以前的備份檔
find ~/wallet/backup -mtime 8 -name "*.*" -exec rm -Rf {} \;

# 備份至/backup並壓縮
sudo docker exec database sh -c 'mysqldump -uroot -p"root" wallet' > ./backup/${FILENAME}
cd backup
gzip ${FILENAME}
cd ..
