sudo docker compose down
sudo docker volume rm wallet_dist
sudo docker compose build
sudo docker compose up -d
