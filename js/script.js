'use strict';

function titleClickHandler(event)
{	
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);

  /* [Done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks)
  {
    activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [Done] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles)
  {
    activeArticle.classList.remove('active');
  }

  /* [Done] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [Done] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML=' ';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html =' ';
  for (let article of articles)
  {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
}

generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object*/
    let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles)
  {

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = ' ';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray)
    {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
            /* [NEW] add generated code to allTags array */
            allTags[tag] = 1;

            /* END LOOP: for each tag */
        } else {
            allTags[tag]++;
        }
    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    console.log(optTagsListSelector);
    console.log(tagList);

    let allTagsHTML = '';
    for (let tag in allTags) {
        allTagsHTML += '<li><a href="' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
        console.log(allTagsHTML);
    }
    tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
 
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of activeTags)
  {

      /* remove class active */
      tag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const TagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of TagLinks)
  {
    /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href ^= "#tag-"]');

/* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);


    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles)
  {
      const wrapper = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');
      const html = '<a href="#' + author + '">by ' + author + '</a>';
      wrapper.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.querySelector('a');
    const author = href.getAttribute('href');
    const activeAuthors = document.querySelectorAll('.post-author a.active');
    for (let activeAuthor of activeAuthors) {
        activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + author + '"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
    }
    const authorLink = author.replace('#', '');
    generateTitleLinks('[data-author="' + authorLink + '"]');

}

function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector);

    for (let authorLink of authorLinks) {

        authorLink.addEventListener('click', authorClickHandler);

    }
}
addClickListenersToAuthors();