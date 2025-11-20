export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>测试图片显示</h1>
      <div>
        <h2>Dublix Game (727)</h2>
        <img 
          src="/media/posts/727/dublix-game.webp" 
          alt="Dublix" 
          style={{ maxWidth: '300px' }}
        />
      </div>
      <div>
        <h2>Rocket Hero Clicker (728)</h2>
        <img 
          src="/media/posts/728/rocket-hero-clicker.webp" 
          alt="Rocket Hero" 
          style={{ maxWidth: '300px' }}
        />
      </div>
    </div>
  );
}