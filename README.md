# 🌤️ React Weather App

A beautiful, modern weather application built with React featuring stunning UI design, real-time weather data, and responsive design.

![Weather App Preview](https://via.placeholder.com/800x400/4facfe/ffffff?text=Weather+App+Preview)

## ✨ Features

- **🔍 City Search**: Search for weather in any city worldwide
- **📍 Geolocation**: Automatically get weather for your current location
- **🌡️ Current Weather**: Display current temperature, feels-like, and weather conditions
- **📊 Detailed Information**: Humidity, wind speed, pressure, and visibility
- **📅 5-Day Forecast**: Extended weather forecast with min/max temperatures
- **🎨 Beautiful UI**: Modern design with gradients, animations, and glass morphism
- **📱 Responsive**: Fully responsive design that works on all devices
- **🌙 Weather Icons**: Beautiful emoji weather icons for different conditions
- **⚡ Fast Loading**: Optimized performance with smooth transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key** (for live weather data)
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard
   - Replace `'your_api_key_here'` in `src/App.js` with your actual API key

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Configuration

### API Key Setup

To use real weather data instead of mock data:

1. Open `src/App.js`
2. Find the line: `const API_KEY = 'your_api_key_here';`
3. Replace `'your_api_key_here'` with your OpenWeatherMap API key

### Enabling Real API Calls

Once you have your API key, you can replace the mock data functions with real API calls:

```javascript
const fetchWeatherByCity = async (cityName) => {
  if (!cityName.trim()) return;
  
  setLoading(true);
  setError('');
  
  try {
    const weatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    setWeather(weatherResponse.data);
    setForecast(forecastResponse.data);
  } catch (err) {
    setError('City not found. Please check the spelling and try again.');
  } finally {
    setLoading(false);
  }
};
```

## 🎨 UI Features

### Design Elements

- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Glass Morphism**: Modern frosted glass effects with backdrop blur
- **Smooth Animations**: Floating weather icons and hover effects
- **Responsive Grid**: Adaptive layout that works on all screen sizes
- **Typography**: Clean, modern font stack for excellent readability

### Color Scheme

- Primary: Blue gradients (`#4facfe` to `#00f2fe`)
- Secondary: Warm gradients (`#ffecd2` to `#fcb69f`)
- Accent: Cool gradients (`#a8edea` to `#fed6e3`)
- Background: Purple gradients (`#667eea` to `#764ba2`)

## 📱 Responsive Design

The app is fully responsive and optimized for:

- **Desktop**: Full-width layout with side-by-side current weather details
- **Tablet**: Adapted grid layout with optimized spacing
- **Mobile**: Single-column layout with touch-friendly interactions

## 🌡️ Weather Data

### Current Weather Information

- Temperature (Celsius)
- Feels-like temperature
- Weather description
- Humidity percentage
- Wind speed (m/s)
- Atmospheric pressure (hPa)
- Visibility (km)

### 5-Day Forecast

- Date and day of week
- Weather icon and description
- High and low temperatures
- Weather conditions

## 🔮 Weather Icons

The app uses emoji-based weather icons for different conditions:

- ☀️ Clear skies
- ☁️ Cloudy
- 🌧️ Rain
- 🌦️ Drizzle
- ⛈️ Thunderstorm
- ❄️ Snow
- 🌫️ Mist/Fog/Haze

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🔒 Environment Variables

For production deployment, consider using environment variables for your API key:

1. Create a `.env` file in the root directory
2. Add: `REACT_APP_WEATHER_API_KEY=your_actual_api_key_here`
3. Use in your code: `process.env.REACT_APP_WEATHER_API_KEY`

## 🚀 Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/weather-app"`
3. Add scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d build"`
4. Deploy: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [React](https://reactjs.org/) for the amazing framework
- [Create React App](https://create-react-app.dev/) for project bootstrapping
- [Axios](https://axios-http.com/) for HTTP requests

## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

---

⭐ If you found this project helpful, please consider giving it a star!
