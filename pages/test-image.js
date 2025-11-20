export default function TestImage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>测试图片加载</h1>
      
      <h2>727 - Dublix (有 responsive 文件夹)</h2>
      <img 
        src="/media/posts/727/dublix-game.webp" 
        alt="Dublix" 
        style={{ maxWidth: '300px', display: 'block', marginBottom: '10px' }}
      />
      <img 
        src="/media/posts/727/responsive/dublix-game-xs.webp" 
        alt="Dublix Responsive" 
        style={{ maxWidth: '300px', display: 'block', marginBottom: '20px' }}
      />
      
      <h2>728 - Rocket Hero (现在也有 responsive 文件夹了)</h2>
      <img 
        src="/media/posts/728/rocket-hero-clicker.webp" 
        alt="Rocket Hero" 
        style={{ maxWidth: '300px', display: 'block', marginBottom: '10px' }}
      />
      <img 
        src="/media/posts/728/responsive/rocket-hero-clicker-xs.webp" 
        alt="Rocket Hero Responsive" 
        style={{ maxWidth: '300px', display: 'block' }}
      />
    </div>
  );
}
