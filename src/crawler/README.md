# Await Protocol Crawler

1. Install [Typesense](https://typesense.org/docs/guide/install-typesense.html):

```sh
# Deb
curl -O https://dl.typesense.org/releases/0.23.1/typesense-server-0.23.1-amd64.deb
sudo apt install ./typesense-server-0.23.1-amd64.deb

# Check
sudo systemctl status typesense-server.service
curl http://localhost:8108/health
```

2. Clear and create schema:

```sh
npx ts-node src/crawler/schema.ts
```

3. Upload a list of all ens domains to a file `src/crawler/ens.txt`.

4. Fill in the `.env` file with environment variables.

```
IPFS_GATEWAY=https://<CUSTOM-SUBDOMAIN>.infura-ipfs.io
ALCHEMY_API=key
```

5. Start the crawler:

```sh
npm run crawler
```
