sudo docker compose down
sudo docker volume rm wallet_wallet-data
sudo docker compose build
sudo docker compose up -d