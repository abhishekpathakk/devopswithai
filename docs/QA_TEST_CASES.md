# 🧪 QA Test Cases: DevOpsWithAI Platform

This document outlines the testing criteria for the DevOpsWithAI consultancy platform, covering UI/UX, Infrastructure, CI/CD, and SEO.

---

## 1. UI/UX & Interactions

| Test Case ID | Description | Expected Result |
|:--- |:--- |:--- |
| **UI-01** | **Custom Cursor Visibility** | Cursor must be black on White Theme and white/glowing on Dark Theme. |
| **UI-02** | **Cursor Hover Effect** | Cursor should expand (scale) when hovering over buttons, links, or service cards. |
| **UI-03** | **Neural Background** | The hero section must show an interactive floating node network. It should respond to mouse movement. |
| **UI-04** | **Stats Counter** | Numbers in the "Impact" section should count up from 0 to target value when scrolled into view. |
| **UI-05** | **Theme Toggle** | Clicking the Sun/Moon icon should instantly switch between Light and Dark modes without flickering. |
| **UI-06** | **Responsiveness** | Site must be readable and functional on Mobile (iOS/Android), Tablet, and Desktop. |

---

## 2. Infrastructure & Networking (GKE)

| Test Case ID | Description | Expected Result |
|:--- |:--- |:--- |
| **INF-01** | **SSL/TLS Encryption** | Accessing `https://devopswithai.in` must show a valid certificate (Google-managed). |
| **INF-02** | **Global Static IP** | The domain must resolve to the reserved static IP `34.120.200.52`. |
| **INF-03** | **Gateway API Routing** | The `gke-l7-global-external-managed` Gateway must route traffic correctly to the frontend service. |
| **INF-04** | **Auto-healing** | Deleting a pod in the `devopswithai-frontend` deployment should trigger an automatic restart/replacement. |

---

## 3. CI/CD Pipeline (GitHub Actions)

| Test Case ID | Description | Expected Result |
|:--- |:--- |:--- |
| **CICD-01** | **WIF Authentication** | The pipeline should authenticate to GCP using Workload Identity Federation (no JSON keys). |
| **CICD-02** | **Segregated Stages** | Build and Deploy stages should be visible as separate jobs in GitHub Actions. |
| **CICD-03** | **Automated Deployment** | Pushing to the `main` branch should trigger an automatic build and roll-out to GKE. |
| **CICD-04** | **Environment Variables** | The deployment should correctly substitute the `IMAGE_URL_PLACEHOLDER` in k8s manifests. |

---

## 4. SEO & Visibility

| Test Case ID | Description | Expected Result |
|:--- |:--- |:--- |
| **SEO-01** | **Sitemap Accessibility** | `https://devopswithai.in/sitemap.xml` must return 200 OK and valid XML. |
| **SEO-02** | **Robots.txt** | `https://devopswithai.in/robots.txt` must allow all crawlers and point to the sitemap. |
| **SEO-03** | **GSC Verification** | The file `google0e2ab8c282b57085.html` must be accessible at the root for Google ownership proof. |
| **SEO-04** | **Meta Tag Preview** | Sharing the link on LinkedIn/Twitter should show the premium browser mockup image. |
| **SEO-05** | **Person Schema** | The page source must contain `application/ld+json` linking the site to Abhishek Pathak's LinkedIn. |

---

## 5. Security

| Test Case ID | Description | Expected Result |
|:--- |:--- |:--- |
| **SEC-01** | **Non-root Container** | The application should run as a non-privileged user inside the Docker container. |
| **SEC-02** | **Public Access** | Only Ports 80 (Redirected) and 443 should be open to the public internet via the Gateway. |
| **SEC-03** | **Secrets Management** | No GCP service account keys should be present in the repository code or GitHub Secrets. |
