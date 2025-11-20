import Script from 'next/script';

export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <base href="/" />
      <title>Dublix Unblocked - FreezeNova</title>
      <meta
        name="description"
        content="A Roblox-inspired sandbox adventure where fun never ends! Play, explore, and create your perfect day in Dublix Unblocked."
      />
      <meta name="generator" content="Publii Open-Source CMS for Static Site" />
      <link rel="stylesheet" href="./media/plugins/staticSearch/static.search.min.css" />
      <link rel="shortcut icon" href="./media/website/favicon-1.ico" type="image/x-icon" />
      <link rel="stylesheet" href="./assets/css/style.css?v=1efb486b1d1dfcca462baef5c982405a" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"http://schema.org","@type":"Article","mainEntityOfPage":{"@type":"WebPage","@id":"./dublix.html"},"headline":"Dublix","datePublished":"2020-01-01T05:27+02:00","dateModified":"2025-11-09T03:21+02:00","image":{"@type":"ImageObject","url":"./media/posts/727/dublix-game.webp","height":512,"width":512},"description":"A Roblox-inspired sandbox adventure where fun never ends! Play, explore, and create your perfect day in Dublix Unblocked.","author":{"@type":"Person","name":"Unblocked Games FreezeNova","url":"./authors/freezenova/"},"publisher":{"@type":"Organization","name":"Unblocked Games FreezeNova","logo":{"@type":"ImageObject","url":"./media/website/unblocked-games-freezenova-logo.webp","height":90,"width":726}}}',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "./index.html" },{ "@type": "ListItem", "position": 2, "name": "Multiplayer", "item": "./multiplayer/index.html" }] }',
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.wgAutoMidroll = false;',
        }}
      />
      <Script
        id="wg-loader"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `if (window.location.pathname.includes("index.html.abc") == false)
					{
						!function(e,t){a=e.createElement("script"),m=e.getElementsByTagName("script")[0],a.async=1,a.src=t,m.parentNode.insertBefore(a,m)}(document,"https://universal.wgplayer.com/tag/?lh="+window.location.hostname+"&wp="+window.location.pathname+"&ws="+window.location.search);
					}`,
        }}
      />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <Script
        id="analytics-loader"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {
            var scriptSrc, configId;
            if (window.location.hostname === 'unblocked-games.s3-accelerate.amazonaws.com') {
                scriptSrc = 'https://www.googletagmanager.com/gtag/js?id=G-S5X25J1HQ5';
                configId = 'G-S5X25J1HQ5';
            } else if (window.location.hostname === 'freezenova.github.io') {
                scriptSrc = 'https://www.googletagmanager.com/gtag/js?id=G-YXFREC5MSS';
                configId = 'G-YXFREC5MSS';
            } else if (window.location.hostname === 'd9k5uuutyxogn.cloudfront.net') {
                scriptSrc = 'https://www.googletagmanager.com/gtag/js?id=G-KLY0GTQKFT';
                configId = 'G-KLY0GTQKFT';
            } else {
                scriptSrc = 'https://www.googletagmanager.com/gtag/js?id=G-Z1FT2YYNFS';
                configId = 'G-Z1FT2YYNFS';
            }
            var gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = scriptSrc;
            document.head.appendChild(gaScript);
            gaScript.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', configId);
            };
        })();`,
        }}
      />
      <Script
        id="redirect-to-index"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {
          var currentUrl = window.location.href;
          var path = window.location.pathname;
          var hostname = window.location.hostname;
          if (hostname === 'freezenova.github.io') {
              if (path.endsWith('/') && !path.endsWith('/index.html')) {
                  window.location.replace(currentUrl + 'index.html');
              }
          }
        })();`,
        }}
      />
      <Script
        id="canonical-handler"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {
            if (window.location.hostname !== 'freezenova.s3.amazonaws.com' &&
    			window.location.hostname !== 'unblocked-games.s3.amazonaws.com') {
                var canonicalLink = document.createElement('link');
                canonicalLink.rel = 'canonical';
                if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    				if (window.location.hostname !== 'freezenova.github.io') {
    					canonicalLink.href = 'https://unblocked-games.s3.amazonaws.com/index.html';
    					document.head.appendChild(canonicalLink);
    				}
                } else {
                    canonicalLink.href = 'https://unblocked-games.s3.amazonaws.com' + window.location.pathname;
    				document.head.appendChild(canonicalLink);
                }
            }
        })();`,
        }}
      />
      <Script
        id="meta-robots"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `// List of allowed domains
  var allowedDomains = [
    'unblocked-games.s3.amazonaws.com',
    'unblocked-games.s3-accelerate.amazonaws.com',
    'freezenova.github.io'
  ];
  function addMetaTags() {
    var hostname = window.location.hostname;
    if (!allowedDomains.includes(hostname)) {
      var metaNoIndexNoFollow = document.createElement('meta');
      metaNoIndexNoFollow.setAttribute('name', 'robots');
      metaNoIndexNoFollow.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(metaNoIndexNoFollow);
    }
  }
  function updatePageTitle() {
    var hostname = window.location.hostname;
    if (!allowedDomains.includes(hostname)) {
    	if (hostname == 'd9k5uuutyxogn.cloudfront.net') {
			var currentTitle = document.title;
      		document.title = currentTitle + ' - Cloud';
        }
    }
    else if (hostname == 'unblocked-games.s3-accelerate.amazonaws.com') {
    	var currentTitle = document.title;
      	document.title = currentTitle + ' Accelerate';
	}
    
  }
  function updatePageH1() {
	document.addEventListener('DOMContentLoaded', (event) => {
		const firstHeading = document.querySelector('h1');
        if (firstHeading) {
			var hostname = window.location.hostname;
			if (!allowedDomains.includes(hostname)) {
    			if (hostname == 'd9k5uuutyxogn.cloudfront.net') {
					firstHeading.innerHTML += ' <sup>Cloud</sup>';
    			}
			}
			else if (hostname == 'unblocked-games.s3-accelerate.amazonaws.com') {
				firstHeading.innerHTML += ' <sup>Accelerate</sup>';
			}
        }
    });
  }
  updatePageTitle();
  addMetaTags();
  updatePageH1();`,
        }}
      />
    </>
  );
}
