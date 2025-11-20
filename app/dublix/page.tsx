import { getHtmlFragment } from '@/lib/loadHtmlFragment';

export default async function DublixPage() {
  const bodyContent = await getHtmlFragment('dublix-body.html');

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
  var head = document.head || document.getElementsByTagName('head')[0];
  if (!head.querySelector('base[href="/"]')) {
    var base = document.createElement('base');
    base.href = '/';
    head.insertBefore(base, head.firstChild || null);
  }
  var cssLinks = [
    '/media/plugins/staticSearch/static.search.min.css',
    '/assets/css/style.css?v=1efb486b1d1dfcca462baef5c982405a'
  ];
  cssLinks.forEach(function(href) {
    if (!head.querySelector('link[href="' + href + '"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      head.appendChild(link);
    }
  });
})();`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
