# 🎨 AI Image Generator

![AI Image Generator Demo](https://via.placeholder.com/800x400?text=Insert+GIF+Here+Showing+Prompt+to+Image+Generation)

A fast, cross-platform mobile application that turns your text prompts into stunning AI-generated artwork in seconds. Built with React Native and Expo, this app leverages the powerful, open-source Pollinations API to instantly render high-quality images without requiring complex backend setups or API keys.

## ✨ Key Features

* **🪄 Text-to-Image Generation:** Type any prompt and watch the AI bring your imagination to life.
* **⚡ Zero-Config AI:** Powered by the Pollinations API—no API keys or authentication required to generate images.
* **🔄 Smart Image Refreshing:** Custom caching bypass logic ensures that new generations instantly update the UI without flickering or showing stale images.
* **📱 Cross-Platform:** Runs seamlessly on both iOS and Android devices.
* **💅 Clean UI/UX:** A minimalist, intuitive interface focused entirely on the artwork.

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/)
* **Toolchain:** [Expo](https://expo.dev/)
* **AI Engine:** [Pollinations API](https://pollinations.ai/)
* **Language:** JavaScript / React

## 📸 Screenshots
**Home Screen**


 <img width="1080" height="2176" alt="image" src="https://github.com/user-attachments/assets/49b70345-92c2-4a95-88a8-4a97947c87fa" />  

**Generator Image**
<img width="1078" height="2130" alt="image" src="https://github.com/user-attachments/assets/e48add16-08b6-43b9-9fdf-d4c375b86b69" />  

**Result**
<img width="540" height="1049" alt="image" src="https://github.com/user-attachments/assets/8a3ac20c-1dcf-4ef9-8f35-9b1533b5508b" /> 

**Another Result**
<img width="540" height="1034" alt="image" src="https://github.com/user-attachments/assets/e8265e03-0e67-4df2-bcf9-7a94d26b39c6" /> 



## 🚀 Getting Started

Follow these steps to run the app locally on your machine.

### Prerequisites

* [Node.js](https://nodejs.org/) installed
* [Expo CLI](https://docs.expo.dev/get-started/installation/) installed (`npm install -g expo-cli`)
* Expo Go app installed on your physical device, OR an iOS Simulator / Android Emulator running.

### Installation

1. **Clone the repository**
   ```bash
     git clone https://github.com/yourusername/Image-Generator-app-using-React-Native.git
     cd Image-Generator-app-using-React-Native
   ```
2 **Install dependencies**
  ```bash
    npm install
 ```
3 **Start the Expo server**
  ```bash
    npx expo start
  ```
4 **Run the app**
   Scan the QR code in the terminal using the Expo Go app on your phone.
   Or press i to open in iOS simulator / a to open in Android emulator.

## 🧠 How it Works (The Pollinations API)
This app utilizes the Pollinations.ai text-to-image API. We pass the user's encoded text prompt directly into the image URL.
Because React Native aggressively caches images with the same base URL, the app implements a custom dynamic URL generation system (appending timestamps/random seeds) to force the <Image /> component to refresh immediately when a new artwork is created.


## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is open source and available under the MIT License.

