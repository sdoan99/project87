# Trading Strategy Platform

## Setup

### Hyvor Talk Configuration

This project uses Hyvor Talk for comments and newsletter functionality. To set it up:

1. Go to [Hyvor Talk Console](https://talk.hyvor.com/console)
2. Add the following domains to your website settings (Settings -> Websites -> Allowed Domains):
   - `127.0.0.1` (for local development)
   - `strats.pro` (production domain)
   - `www.strats.pro` (if using www subdomain)
   - `*.strats.pro` (if using other subdomains)

3. The website ID is: `13022`

### Development

To run the project locally:
```bash
npm install
npm run dev
```

The development server will run on `http://127.0.0.1:5173`
