* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff758c, #ff7eb3, #fad0c4);
}

/* floating hearts background */
.bg-hearts::before {
  content: "💖 💕 💗 💞 💘 💝";
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 40px;
  opacity: 0.2;
  animation: float 10s linear infinite;
}

@keyframes float {
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}

.card {
  background: rgba(255,255,255,0.2);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
  color: white;
  font-size: 28px;
}

.sub {
  color: #fff;
  margin-top: 10px;
  opacity: 0.8;
}

.buttons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 12px 28px;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;
}

#yesBtn {
  background: #ff2d75;
  color: white;
}

#yesBtn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px #ff2d75;
}

#noBtn {
  background: white;
  color: #333;
  position: absolute;
}

/* popup */
.popup {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  display: none;
}

.popup-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 90%;
  max-width: 500px;
}

.gallery {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery img {
  width: 100px;
  border-radius: 12px;
  animation: pop 1s infinite alternate;
}

@keyframes pop {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

#closeBtn {
  margin-top: 20px;
  background: #ff2d75;
  color: white;
}