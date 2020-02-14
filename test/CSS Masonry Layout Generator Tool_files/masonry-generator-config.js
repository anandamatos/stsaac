/**
 * Set appropriate spanning to any masonry item
 *
 * Get different properties we already set for the masonry, calculate 
 * height or spanning for any cell of the masonry grid based on its 
 * content-wrapper's height, the (row) gap of the grid, and the size 
 * of the implicit row tracks.
 *
 * @param item Object A brick/tile/cell inside the masonry
 * @link https://w3bits.com/css-grid-masonry/
 */
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName('masonry')[0];
  if( grid ) {
    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
        gridImagesAsContent = item.querySelector('img.masonry-content');

    /*
     * Spanning for any brick = S
     * Grid's row-gap = G
     * Size of grid's implicitly create row-track = R
     * Height of item content = H
     * Net height of the item = H1 = H + G
     * Net height of the implicit row-track = T = G + R
     * S = H1 / T
     */
    var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    /* Set the spanning as calculated above (S) */
    item.style.gridRowEnd = 'span '+rowSpan;
    if(gridImagesAsContent) {
      item.querySelector('img.masonry-content').style.height = item.getBoundingClientRect().height + "px";
    }
  }
}

/**
 * Apply spanning to all the masonry items
 *
 * Loop through all the items and apply the spanning to them using 
 * `resizeMasonryItem()` function.
 *
 * @uses resizeMasonryItem
 * @link https://w3bits.com/css-grid-masonry/
 */
function resizeAllMasonryItems(){
  // Get all item class objects in one list
  var allItems = document.querySelectorAll('.masonry-item');

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  if( allItems ) {
    for(var i=0;i>allItems.length;i++){
      resizeMasonryItem(allItems[i]);
    }
  }
}

/**
 * Resize the items when all the images inside the masonry grid 
 * finish loading. This will ensure that all the content inside our
 * masonry items is visible.
 *
 * @uses ImagesLoaded
 * @uses resizeMasonryItem
 * @link https://w3bits.com/css-grid-masonry/
 */
function waitForImages() {
  //var grid = document.getElementById("masonry");
  var allItems = document.querySelectorAll('.masonry-item');
  if( allItems ) {
    for(var i=0;i<allItems.length;i++){
      imagesLoaded( allItems[i], function(instance) {
        var item = instance.elements[0];
        resizeMasonryItem(item);
        console.log("Waiting for Images");
      } );
    }
  }
}

var css_reset = "/**\n * RESET\n * Reference: http://meyerweb.com/eric/tools/css/reset/\n */\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1.618;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\na {\n  text-decoration: none;\n}\n\ncode, pre, samp {\n  font-family: monospace;\n}\n\n/**\n * BASIC TYPE\n */\n\nimg, video {\n  max-width: 100%;\n  vertical-align: middle;\n}\n\np:not(:last-child) {\n  margin: 0 0 1em;\n}\n\nh1, h2, h3, h4 {\n  margin: .5em 0 .75em;\n  line-height: 1.3;\n}\n\nh1 {\n  font-size: 1.5em;\n}\n\nh2 {\n  font-size: 1.25em;\n}\n\nh3 {\n  font-size: 1.125em;\n}\n\nh4 {\n  font-size: 1em;\n}\n\n/**\n * BOX HACKING\n */\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}";

var masonry_js = "/**\n * Set appropriate spanning to any masonry item\n *\n * Get different properties we already set for the masonry, calculate \n * height or spanning for any cell of the masonry grid based on its \n * content-wrapper\'s height, the (row) gap of the grid, and the size \n * of the implicit row tracks.\n *\n * @param item Object A brick/tile/cell inside the masonry\n * @link https://w3bits.com/css-grid-masonry/\n */\nfunction resizeMasonryItem(item){\n  /* Get the grid object, its row-gap, and the size of its implicit rows */\n  var grid = document.getElementsByClassName(\'masonry\')[0];\n  if( grid ) {\n    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue(\'grid-row-gap\')),\n        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue(\'grid-auto-rows\')),\n        gridImagesAsContent = item.querySelector(\'img.masonry-content\');\n\n    /*\n     * Spanning for any brick = S\n     * Grid\'s row-gap = G\n     * Size of grid\'s implicitly create row-track = R\n     * Height of item content = H\n     * Net height of the item = H1 = H + G\n     * Net height of the implicit row-track = T = G + R\n     * S = H1 / T\n     */\n    var rowSpan = Math.ceil((item.querySelector(\'.masonry-content\').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));\n\n    /* Set the spanning as calculated above (S) */\n    item.style.gridRowEnd = \'span \'+rowSpan;\n    if(gridImagesAsContent) {\n      item.querySelector(\'img.masonry-content\').style.height = item.getBoundingClientRect().height + \"px\";\n    }\n  }\n}\n\n/**\n * Apply spanning to all the masonry items\n *\n * Loop through all the items and apply the spanning to them using \n * `resizeMasonryItem()` function.\n *\n * @uses resizeMasonryItem\n * @link https://w3bits.com/css-grid-masonry/\n */\nfunction resizeAllMasonryItems(){\n  // Get all item class objects in one list\n  var allItems = document.querySelectorAll(\'.masonry-item\');\n\n  /*\n   * Loop through the above list and execute the spanning function to\n   * each list-item (i.e. each masonry item)\n   */\n  if( allItems ) {\n    for(var i=0;i>allItems.length;i++){\n      resizeMasonryItem(allItems[i]);\n    }\n  }\n}\n\n/**\n * Resize the items when all the images inside the masonry grid \n * finish loading. This will ensure that all the content inside our\n * masonry items is visible.\n *\n * @uses ImagesLoaded\n * @uses resizeMasonryItem\n * @link https://w3bits.com/css-grid-masonry/\n */\nfunction waitForImages() {\n  //var grid = document.getElementById(\"masonry\");\n  var allItems = document.querySelectorAll(\'.masonry-item\');\n  if( allItems ) {\n    for(var i=0;i<allItems.length;i++){\n      imagesLoaded( allItems[i], function(instance) {\n        var item = instance.elements[0];\n        resizeMasonryItem(item);\n        console.log(\"Waiting for Images\");\n      } );\n    }\n  }\n}\n\n/* Resize all the grid items on the load and resize events */\nvar masonryEvents = [\'load\', \'resize\'];\nmasonryEvents.forEach( function(event) {\n  window.addEventListener(event, resizeAllMasonryItems);\n} );\n\n/* Do a resize once more when all the images finish loading */\nwaitForImages();";

var download_css_reset = css_reset + '\n.wrapper { \n  max-width: 1280px;\n  margin-right: auto;\n  margin-left: auto;\n  padding: 1.5em;\n}\n';

var masonry_markup_1 = '<div class=\"masonry\">\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/325?image=100\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/450?image=200\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/280?image=300\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/540?image=400\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/380?image=500\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/300?image=600\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/400?image=700\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/300?image=800\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/280?image=900\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/480?image=925\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/550?image=950\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/600?image=1000\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/325?image=25\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/450?image=50\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/280?image=75\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/540?image=100\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/380?image=125\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/300?image=161\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/400?image=175\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/300?image=200\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/280?image=225\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/480?image=250\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/550?image=275\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/600?image=300\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/325?image=13\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/450?image=26\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/280?image=39\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/540?image=52\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/380?image=65\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n  <div class=\"masonry-item\">\n    <img src=\"https:\/\/picsum.photos/450/300?image=78\" alt=\"Dummy Image\" class=\"masonry-content\">\n  </div>\n</div>\n';

var masonry_markup_2 = '<div class="masonry">\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/325?image=100" alt="Dummy Image">\n      <h3 class="masonry-title">Nesciunt aspernatur eaque similique laudantium a</h3>\n      <p class="masonry-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda modi inventore, totam vero consequuntur, aut animi veritatis tempora nulla facere placeat velit illum explicabo dicta enim ipsum. Vitae ducimus, ratione.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/450?image=200" alt="Dummy Image">\n      <h3 class="masonry-title">Consequatur adipisci neque possimus quod ut quidem omnis numquam dolorum</h3>\n      <p class="masonry-description">Consectetur adipisicing elit. Sit enim ipsam mollitia repellat nemo, accusantium? Fugit id ipsam libero vitae quas perferendis, delectus a amet perspiciatis iusto. Quia, quam, culpa.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/280?image=300" alt="Dummy Image">\n      <h3 class="masonry-title">Adipisci alias ullam est accusamus</h3>\n      <p class="masonry-description">Adipisci repellendus ratione laudantium nisi eaque voluptatem fuga quod hic, explicabo amet at laborum maiores ducimus et a vel quidem dolorem modi.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/540?image=400" alt="Dummy Image">\n      <h3 class="masonry-title">Dolor sit amet, consectetur adipisicing elit</h3>\n      <p class="masonry-description">Vitae est numquam, dolore, ipsum tempora molestiae. Ut optio natus velit eaque tempora commodi dolor doloremque error quidem labore, incidunt odit est nobis numquam. Ullam quas minima, neque modi reiciendis consequuntur inventore!</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/380?image=500" alt="Dummy Image">\n      <h3 class="masonry-title">Veritatis aut repellendus, quidem nesciunt consequatur nulla sed itaque</h3>\n      <p class="masonry-description">Expedita voluptate similique ad harum dolorem nam ipsa repellat quos, autem eius magni minima, asperiores nobis repudiandae ut quibusdam atque! Delectus atque veniam labore suscipit ullam, consequuntur dicta, tenetur est nulla, quod obcaecati similique?</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/300?image=600" alt="Dummy Image">\n      <h3 class="masonry-title">Culpa quo animi ut temporibus, et distinctio facere perspiciatis saepe sunt unde</h3>\n      <p class="masonry-description">Iusto magni quasi recusandae autem ipsum asperiores consequatur explicabo, vero nam iste quas sequi reiciendis quod, quos!</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/400?image=700" alt="Dummy Image">\n      <h3 class="masonry-title">Molestiae quod consectetur enim modi unde expedita dicta placeat?</h3>\n      <p class="masonry-description">Aliquam laudantium mollitia quo sint maxime omnis repellendus beatae. Consequuntur molestias odio sapiente. Officia minima, nisi! Tempora vero, architecto ducimus animi nostrum nobis aliquid eligendi illo, facilis temporibus.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/300?image=800" alt="Dummy Image">\n      <h3 class="masonry-title">Sit amet, consectetur adipisicing elit. Incidunt, commodi!</h3>\n      <p class="masonry-description">Accusamus culpa maxime harum minus ipsa ea qui, blanditiis sequi debitis. Temporibus quisquam consequatur dolor, aliquid odio nulla dolorum animi quasi et! Reiciendis ipsum repellendus quaerat explicabo, laboriosam amet, temporibus at sed voluptatibus, minima quia.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/280?image=900" alt="Dummy Image">\n      <h3 class="masonry-title">Inventore ducimus, voluptate a nostrum molestiae non</h3>\n      <p class="masonry-description">Similique officia recusandae, at labore quae, minus aspernatur cupiditate repellendus optio nesciunt iure aliquid praesentium, omnis, quas est natus temporibus aliquam vero.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/480?image=925" alt="Dummy Image">\n      <h3 class="masonry-title">Voluptatum nisi, nostrum eaque consequatur officiis similique!</h3>\n      <p class="masonry-description">Soluta eius itaque, molestiae laborum! Facere velit reiciendis quis architecto vel minima consequuntur voluptates temporibus consequatur, aperiam maiores! Perferendis quos architecto quaerat, aliquid earum culpa labore.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/550?image=950" alt="Dummy Image">\n      <h3 class="masonry-title">Perspiciatis non voluptatibus quo ab doloremque accusantium</h3>\n      <p class="masonry-description">Eligendi similique excepturi cumque nemo modi voluptates mollitia atque doloribus, laborum magnam itaque a! Dignissimos expedita vel minus impedit laudantium.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/600?image=1000" alt="Dummy Image">\n      <h3 class="masonry-title">Quam id laudantium debitis perferendis neque perspiciatis!</h3>\n      <p class="masonry-description">Deleniti blanditiis iste cupiditate ea obcaecati corporis, quas nobis possimus molestiae. Sed, minima.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/325?image=25" alt="Dummy Image">\n      <h3 class="masonry-title">Nesciunt aspernatur eaque similique laudantium a</h3>\n      <p class="masonry-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda modi inventore, totam vero consequuntur, aut animi veritatis tempora nulla facere placeat velit illum explicabo dicta enim ipsum. Vitae ducimus, ratione.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/450?image=50" alt="Dummy Image">\n      <h3 class="masonry-title">Consequatur adipisci neque possimus quod ut quidem omnis numquam dolorum</h3>\n      <p class="masonry-description">Consectetur adipisicing elit. Sit enim ipsam mollitia repellat nemo, accusantium? Fugit id ipsam libero vitae quas perferendis, delectus a amet perspiciatis iusto. Quia, quam, culpa.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/280?image=75" alt="Dummy Image">\n      <h3 class="masonry-title">Adipisci alias ullam est accusamus</h3>\n      <p class="masonry-description">Adipisci repellendus ratione laudantium nisi eaque voluptatem fuga quod hic, explicabo amet at laborum maiores ducimus et a vel quidem dolorem modi.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/540?image=100" alt="Dummy Image">\n      <h3 class="masonry-title">Dolor sit amet, consectetur adipisicing elit</h3>\n      <p class="masonry-description">Vitae est numquam, dolore, ipsum tempora molestiae. Ut optio natus velit eaque tempora commodi dolor doloremque error quidem labore, incidunt odit est nobis numquam. Ullam quas minima, neque modi reiciendis consequuntur inventore!</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/380?image=125" alt="Dummy Image">\n      <h3 class="masonry-title">Veritatis aut repellendus, quidem nesciunt consequatur nulla sed itaque</h3>\n      <p class="masonry-description">Expedita voluptate similique ad harum dolorem nam ipsa repellat quos, autem eius magni minima, asperiores nobis repudiandae ut quibusdam atque! Delectus atque veniam labore suscipit ullam, consequuntur dicta, tenetur est nulla, quod obcaecati similique?</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/300?image=161" alt="Dummy Image">\n      <h3 class="masonry-title">Culpa quo animi ut temporibus, et distinctio facere perspiciatis saepe sunt unde</h3>\n      <p class="masonry-description">Iusto magni quasi recusandae autem ipsum asperiores consequatur explicabo, vero nam iste quas sequi reiciendis quod, quos!</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/400?image=175" alt="Dummy Image">\n      <h3 class="masonry-title">Molestiae quod consectetur enim modi unde expedita dicta placeat?</h3>\n      <p class="masonry-description">Aliquam laudantium mollitia quo sint maxime omnis repellendus beatae. Consequuntur molestias odio sapiente. Officia minima, nisi! Tempora vero, architecto ducimus animi nostrum nobis aliquid eligendi illo, facilis temporibus.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/300?image=200" alt="Dummy Image">\n      <h3 class="masonry-title">Sit amet, consectetur adipisicing elit. Incidunt, commodi!</h3>\n      <p class="masonry-description">Accusamus culpa maxime harum minus ipsa ea qui, blanditiis sequi debitis. Temporibus quisquam consequatur dolor, aliquid odio nulla dolorum animi quasi et! Reiciendis ipsum repellendus quaerat explicabo, laboriosam amet, temporibus at sed voluptatibus, minima quia.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/280?image=225" alt="Dummy Image">\n      <h3 class="masonry-title">Inventore ducimus, voluptate a nostrum molestiae non</h3>\n      <p class="masonry-description">Similique officia recusandae, at labore quae, minus aspernatur cupiditate repellendus optio nesciunt iure aliquid praesentium, omnis, quas est natus temporibus aliquam vero.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/480?image=250" alt="Dummy Image">\n      <h3 class="masonry-title">Voluptatum nisi, nostrum eaque consequatur officiis similique!</h3>\n      <p class="masonry-description">Soluta eius itaque, molestiae laborum! Facere velit reiciendis quis architecto vel minima consequuntur voluptates temporibus consequatur, aperiam maiores! Perferendis quos architecto quaerat, aliquid earum culpa labore.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/550?image=275" alt="Dummy Image">\n      <h3 class="masonry-title">Perspiciatis non voluptatibus quo ab doloremque accusantium</h3>\n      <p class="masonry-description">Eligendi similique excepturi cumque nemo modi voluptates mollitia atque doloribus, laborum magnam itaque a! Dignissimos expedita vel minus impedit laudantium.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/600?image=300" alt="Dummy Image">\n      <h3 class="masonry-title">Quam id laudantium debitis perferendis neque perspiciatis!</h3>\n      <p class="masonry-description">Deleniti blanditiis iste cupiditate ea obcaecati corporis, quas nobis possimus molestiae. Sed, minima.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/325?image=13" alt="Dummy Image">\n      <h3 class="masonry-title">Nesciunt aspernatur eaque similique laudantium a</h3>\n      <p class="masonry-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda modi inventore, totam vero consequuntur, aut animi veritatis tempora nulla facere placeat velit illum explicabo dicta enim ipsum. Vitae ducimus, ratione.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/450?image=26" alt="Dummy Image">\n      <h3 class="masonry-title">Consequatur adipisci neque possimus quod ut quidem omnis numquam dolorum</h3>\n      <p class="masonry-description">Consectetur adipisicing elit. Sit enim ipsam mollitia repellat nemo, accusantium? Fugit id ipsam libero vitae quas perferendis, delectus a amet perspiciatis iusto. Quia, quam, culpa.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/280?image=39" alt="Dummy Image">\n      <h3 class="masonry-title">Adipisci alias ullam est accusamus</h3>\n      <p class="masonry-description">Adipisci repellendus ratione laudantium nisi eaque voluptatem fuga quod hic, explicabo amet at laborum maiores ducimus et a vel quidem dolorem modi.</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/540?image=52" alt="Dummy Image">\n      <h3 class="masonry-title">Dolor sit amet, consectetur adipisicing elit</h3>\n      <p class="masonry-description">Vitae est numquam, dolore, ipsum tempora molestiae. Ut optio natus velit eaque tempora commodi dolor doloremque error quidem labore, incidunt odit est nobis numquam. Ullam quas minima, neque modi reiciendis consequuntur inventore!</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/380?image=65" alt="Dummy Image">\n      <h3 class="masonry-title">Veritatis aut repellendus, quidem nesciunt consequatur nulla sed itaque</h3>\n      <p class="masonry-description">Expedita voluptate similique ad harum dolorem nam ipsa repellat quos, autem eius magni minima, asperiores nobis repudiandae ut quibusdam atque! Delectus atque veniam labore suscipit ullam, consequuntur dicta, tenetur est nulla, quod obcaecati similique?</p>\n    </div>\n  </div>\n  <div class="masonry-item">\n    <div class="masonry-content">\n      <img src="https://picsum.photos/450/300?image=78" alt="Dummy Image">\n      <h3 class="masonry-title">Culpa quo animi ut temporibus, et distinctio facere perspiciatis saepe sunt unde</h3>\n      <p class="masonry-description">Iusto magni quasi recusandae autem ipsum asperiores consequatur explicabo, vero nam iste quas sequi reiciendis quod, quos!</p>\n    </div>\n  </div>\n</div>\n';

function accordion() {
  var accItem = document.getElementsByClassName('accordion-item'),
      accHD = document.getElementsByClassName('accordion-item-title');
  for (i = 0; i < accHD.length; i++) {
    accHD[i].innerHTML+= '<span class="accordion-drop-icon">+</span>';
    accHD[i].addEventListener('click', function() {
    for (i = 0; i < accItem.length; i++) {
      //accItem[i].classList.toggle('accordion-item-close', 'accordion-item-open');
      accItem[i].classList.remove('accordion-item-open');
      accItem[i].classList.add('accordion-item-close');
    }
    this.parentNode.classList.toggle('accordion-item-open', 'accordion-item-close');
    }, false);
  }
}

accordion();

var options = document.getElementById('options');
var toggle_options = document.getElementById('toggle-options');
toggle_options.addEventListener('click', function() {
  if(options.classList.contains('bits-options--hidden')) {
    options.classList.remove('bits-options--hidden');
    options.parentNode.classList.add('has-bits-options-visible');
    this.querySelector('.toggle-btn-icon').innerHTML='&#8249;';
  } else {
    options.classList.add('bits-options--hidden');
    options.parentNode.classList.remove('has-bits-options-visible');
    this.querySelector('.toggle-btn-icon').innerHTML='&#9881;';
  }
})

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}


var css_val = css_val_add = js_val = markup = '',
    cols = document.getElementById("cols"),
    cols_tablet = document.getElementById("cols_tablet"),
    cols_mobile = document.getElementById("cols_mobile"),
    gutter = document.getElementById("gutter"),
    css = document.getElementById("css"),
    html = document.getElementById("html"),
    js = document.getElementById("js"),
    code = document.getElementById("code"),
    direction = document.getElementById("direction"),
    preview = document.getElementById("preview"),
    template = document.getElementById("template"),
    radius = document.getElementById("radius"),
    wrapper = document.getElementById("wrapper"),
    credits = document.getElementById("credits"),
    shadow = document.getElementById("shadow"),
    code_order = document.getElementById("code_order"),
    item_index = document.getElementById("item_index"),
    body_bg = document.getElementById("body_bg"),
    body_co = document.getElementById("body_co"),
    item_bg = document.getElementById("item_bg"),
    item_co = document.getElementById("item_co"),
    css_wrap = document.getElementById("css_wrap"),
    html_wrap = document.getElementById("html_wrap"),
    js_wrap = document.getElementById("js_wrap"),
    code_wrap = document.getElementById("code_wrap"),
    fieldsArray = [ cols, cols_tablet, cols_mobile, gutter, css, html, js, code, direction, preview, template, radius, wrapper, credits, shadow, code_order, item_index, body_bg, body_co, item_bg, item_co, css_wrap, html_wrap, js_wrap, code_wrap ];

function getValues() {
  cols_val = cols.value,
  cols_tablet_val = cols_tablet.value,
  cols_mobile_val = cols_mobile.value,
  gutter_val = gutter.value,
  radius_val = radius.value,
  wrapper_val = wrapper.value,
  body_bg_val = body_bg.value,
  body_co_val = body_co.value,
  item_bg_val = item_bg.value,
  item_co_val = item_co.value,
  credits_val = credits.checked,
  shadow_val = shadow.checked,
  item_index_val = item_index.checked,
  item_order_val = code_order.checked,
  direction_val = direction.options[direction.selectedIndex].value,
  template_val = template.options[template.selectedIndex].value;
}

function reformGrid(el) {
  var masonryEvents = ['change', 'keyup', 'keydown', 'paste', 'input'];
  masonryEvents.forEach( function(event) {
    el.addEventListener(event, function() {
      getValues();
      preview.querySelector('.masonry-wrapper').style.opacity = '.1';
      preview.classList.add('preview-loading');
      setTimeout(function() {
        generateCSS();
        preview.querySelector('.masonry-wrapper').style.opacity = '1';
      }, 1000);
    });
  } );
}

function generateZipFile() {
  zip.generateAsync({type:"blob"}).then(function(content) {
    saveAs(content, "masonry.zip");
  });
}

function triggerGridReformation() {
  fieldsArray.forEach( function(field) { reformGrid(field); } );
}

function generateCSS() {
  if(template_val == 'images') {
    markup = masonry_markup_1;
  } else {
    markup = masonry_markup_2;
  }
  css_val = 'body {\n  background-color: ' + body_bg_val + ';\n  color: ' + body_co_val + ';\n}';
  css_val+= '\n.masonry-wrapper {\n  padding: 1.5em;\n  max-width: ' + wrapper_val + 'px;\n  margin-right: auto;\n  margin-left: auto;\n}';
  if(direction_val == 'ltr') {
    js_val = masonry_js;
    js.value = js_val;
    diEl('js_wrap', 'block');
    css_val+= '\n.masonry {\n  display: grid;\n';
    css_val+='  grid-template-columns: repeat(' + cols_mobile_val + ', minmax(100px,1fr));\n';
    if(gutter.value > 0 ) {
      css_val+='  grid-gap: ' + gutter_val + 'px;\n';
    }
    css_val+='  grid-auto-rows: 0;\n';
    css_val+='}';
    css_val+='\n@media only screen and (max-width: 1023px) and (min-width: 768px) {\n  .masonry {\n    grid-template-columns: repeat(' + cols_tablet_val + ', minmax(100px,1fr));\n  }\n}';
    css_val+='\n@media only screen and (min-width: 1024px) {\n  .masonry {\n    grid-template-columns: repeat(' + cols_val + ', minmax(100px,1fr));\n  }\n}';
  } else {
    js_val = '';
    diEl('js_wrap', 'none');
    css_val+= '\n.masonry {\n  columns: ' + cols_mobile_val + ';\n'; 
    css_val+= '  column-gap: ' + gutter_val + 'px;\n';
    css_val+= '}';
    css_val+='\n.masonry-item {\n  display: inline-block;\n  vertical-align: top;\n';
    if(gutter.value > 0 ) {
      css_val+='  margin-bottom: ' + gutter_val + 'px;\n';
    }
    css_val+='}';
    css_val+='\n@media only screen and (max-width: 1023px) and (min-width: 768px) {  .masonry {\n    columns: ' + cols_tablet_val + ';\n  }\n}';
    css_val+='\n@media only screen and (min-width: 1024px) {\n  .masonry {\n    columns: ' + cols_val + ';\n  }\n}';
  }
  if(radius.value > 0 ) {
    css_val+='\n.masonry-item, .masonry-content {\n  border-radius: ' + radius_val + 'px;\n  overflow: hidden;\n}';
  }
  if(shadow.checked) {
    shadow_lod = (lightOrDark(body_bg_val) == 'dark') ? 'rgba(0, 0, 0, .4)': 'rgba(0, 0, 0, .3)';
    css_val+='\n.masonry-item {\n  filter: drop-shadow(0px 2px 2px ' + shadow_lod + ');\n  transition: filter .25s ease-in-out;\n}';
    css_val+='\n.masonry-item:hover {\n  filter: drop-shadow(0px 5px 5px ' + shadow_lod + ');\n}';
  }
  if( template_val == 'cards' ) {
    item_bg_lod = (lightOrDark(item_bg_val) == 'dark') ? 'rgba(255, 255, 255, .05)': 'rgba(0, 0, 0, .05)';
    css_val+='\n.masonry-content {\n  overflow: hidden;\n}';
    css_val+='\n.masonry-item {\n  color: ' + item_co_val + ';\n  background-color: ' + item_bg_val + ';\n}';
    css_val+='\n.masonry-title, .masonry-description {\n  margin: 0;\n}';
    css_val+='\n.masonry-title {\n  font-weight: 700;\n  font-size: 1.1rem;\n  padding: 1rem 1.5rem;\n}';
    css_val+='\n.masonry-description {\n  padding: 1.5rem;\n  font-size: .75rem;\n  border-top: 1px solid ' + item_bg_lod + ';\n}';
  }
  if(credits_val == true) {
    markup+='<div class=\"masonry-footer\">\n  <p>Created with &#10084; with <a href=\"\/\/w3bits.com\/tools\/masonry-generator\/\" target=\"_blank\" rel=\"external noopener nofollow\">CSS Masonry Generator<\/a></p>\n<\/div>';
    css_val+='\n.masonry-footer {\n  font-size: .75em;\n  opacity: .25;\n  text-align: center;\n  padding-top: 3em; \n  padding-bottom: 3em;\n  margin-bottom: -1.5em;\n  transition: opacity 1s ease-in-out;\n}';
    css_val+='\n.masonry-footer a {\n  color: currentColor;\n}';
    css_val+='\n.masonry-footer:hover, .masonry-footer:active, .masonry-footer:focus {\n  opacity: .75;\n}';
  }
  if(item_index.checked) {
    css_val_add=':root {\n  counter-reset: masonry;\n}\n.masonry-item, .masonry-item img {\n  position: relative;\n}\n.masonry-item:after {\n  font-weight: 700;\n  background-color: rgba(0, 0, 0, .5);\n  content: counter(masonry);\n  counter-increment: masonry;\n  position: absolute;\n  top: 0;\n  left: 0; \n  height: 100%;\n  width: 100%;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all .1s ease-in;\n}\n.masonry-item:hover:after {\n  font-size: 30px;\n  background-color: rgba(0, 0, 0, .75);\n}\n';
  } else {
    css_val_add='';
  }
  if(direction_val == 'ltr') {
    download_markup = '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class=\"masonry-wrapper\">' + markup + '</div><script src=\"\/\/unpkg.com/imagesloaded@4\/imagesloaded.pkgd.min.js\"><\/script><script src="masonry.js"><\/script></body>\n</html>';
  } else {
    download_markup = '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div class=\"masonry-wrapper\">' + markup + '</div></body>\n</html>';
  }
  if(code_order.checked) {
    css.value = css_val;
    diEl('code_wrap', 'none');
    diEl('html_wrap', 'block');
    diEl('css_wrap', 'block');
    if(direction_val == 'ltr') {
      diEl('js_wrap', 'block');
      html.value = '<div class="masonry-wrapper">\n  ' + markup + '\n</div><script src=\"\/\/unpkg.com/imagesloaded@4\/imagesloaded.pkgd.min.js\"><\/script>';
    } else {
        html.value = '<div class="masonry-wrapper">\n  ' + markup + '\n</div>';
    }
  } else {
    code.value = '<!doctype html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">' + '\n  <style>\n' + css_val + '\n  <\/style>\n' + '</head>\n<body>\n  <div class=\"masonry-wrapper\">' + markup + '  </div>' + (js_val ? '  <script src=\"\/\/unpkg.com/imagesloaded@4\/imagesloaded.pkgd.min.js\"><\/script>\n  <script>\n' + js_val + '  \n<\/script>': '') + '\n</body>\n</html>';
    diEl('code_wrap', 'block');
    diEl('html_wrap', 'none');
    diEl('css_wrap', 'none');
    diEl('js_wrap', 'none');
  }
  preview.innerHTML = '<div class=\"masonry-wrapper\">' + markup + '</div><style>' + css_reset + '#preview { color: ' + body_co_val + ' !important; }' + css_val + css_val_add + '</style>';
  preview.classList.remove('preview-loading');
  if( direction_val == 'ltr' ) {
    /* Resize all the grid items on the load and resize events */
    var masonryEvents = ['load', 'resize'];
    masonryEvents.forEach( function(event) {
      window.addEventListener(event, function() {
        resizeAllMasonryItems();
      });
    } );

    waitForImages();
  }

  zip.file("index.html", download_markup);
  zip.file("style.css", download_css_reset + css_val);
  if(direction_val == "ltr") {
    zip.file("masonry.js", js_val);
  }
}

getValues();
var zip = new JSZip();
generateCSS();
triggerGridReformation();