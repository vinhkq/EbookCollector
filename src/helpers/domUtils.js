import cheerio from 'cheerio';

export function indexDOMParser (data) {
  const $ = cheerio.load(data);
  const items = $('.row .book-top').map((index, item) => {
    const name = $(item).find("a[rel='bookmark']").attr('title');
    const image = $(item).find('.img-responsive').attr('src');
    const rating = $(item).find("meta[itemprop='ratingValue']").attr('content');
    const href = $(item).find('.btn-info').attr('href');

    const authorList = $(item).find('.info').eq(1).find("a[rel='tag']").map((index, author) => {
      return $(author).text();
    }).get();
    
    const authorLinks = $(item).find('.info').eq(1).find("a[rel='tag']").map((index, author) => {
      return $(author).attr('href');
    }).get();

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