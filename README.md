# Get Paid! Piggy Smash — website

Landing page, privacy policy, and support page for the game.
Static HTML, served via GitHub Pages at **https://piggiesmash.com**.

## Domain

The custom domain lives in `CNAME` (`piggiesmash.com`) — GitHub Pages rewrites the
Pages setting from it on every build, so don't delete the file. DNS is at Namecheap
(BasicDNS), under the domain's **Advanced DNS** tab:

| Type  | Host  | Value                                                                      |
|-------|-------|----------------------------------------------------------------------------|
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA  | `@`   | `2606:50c0:8000::153`, `:8001::153`, `:8002::153`, `:8003::153`             |
| CNAME | `www` | `potiyev.github.io.`                                                        |

Apex is canonical; GitHub Pages redirects `www` to it on its own.
