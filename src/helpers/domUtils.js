import cheerio from 'cheerio';

export function indexDOMParser (data) {
  const $ = cheerio.load(data);
  const items = $('.row .book-top').map((index, item) => {
    const name = $(item).find("a[rel='bookmark']").attr('title');
    const image = $(item).find('.img-responsive').attr('src');
    const rating = $(item).find("meta[itemprop='ratingValue']").attr('content');
    const href = $(item).find('.btn-info').attr('href');
    const authorList = $(item).find('.info').eq(1).find("a[rel='tag']").map((index, author) => $(author).text()).get();
    const authorLinks = $(item).find('.info').eq(1).find("a[rel='tag']").map((index, author) => $(author).attr('href')).get();
    const publisher = $(item).find('.info').eq(2).find("a[rel='tag']").text();
    const publisherLink = $(item).find('.info').eq(2).find("a[rel='tag']").attr('href');
    const information = $(item).find('.info').eq(2).text();

    return {
      index,
      name,
      image,
      rating,
      href,
      authorList,
      authorLinks,
      publisher, 
      publisherLink,
      information
    };
  }).get();

    return items;
}

export function detailDOMParser (data) {
  const $ = cheerio.load(data);

  const name = $("h1[itemprop='name']").text();
  const rating = $("meta[itemprop='ratingValue']").attr('content');
  const image = $('.img-responsive').attr('src');
  const authorList = $('.info').eq(1).find("a[rel='tag']").map((index, author) => $(author).text()).get();
  const authorLinks = $('.info').eq(1).find("a[rel='tag']").map((index, author) => $(author).attr('href')).get();
  const publisher = $('.info').eq(2).find("a[rel='tag']").text();
  const publisherLink = $('.info').eq(2).find("a[rel='tag']").attr('href');
  const publishDate = $('.info').eq(3).find('i').text();
  const pages = $('.info').eq(4).find('i').text();
  const description = $('.panel-body').eq(1).html();

  const downloadInfo =$('tr').map((index, td) => {
    const site = $(td).find('td').eq(0).text();
    if (site === 'ZippyShare') {
      const link = $(td).find('td').eq(1).find('a').attr('href');
      const type = $(td).find('td').eq(2).text();
      const size = $(td).find('td').eq(3).text();
      const uploadDate = $(td).find('td').eq(4).text();
      return { site, link, type, size, uploadDate };
    }
  }).get();

  return {
    name,
    image,
    rating,
    authorList,
    authorLinks,
    publisher, 
    publisherLink,
    publishDate,
    pages,
    description,
    downloadInfo
  };
}