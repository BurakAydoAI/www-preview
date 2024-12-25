/* eslint-env browser, jquery */

function initPaginatePlugin() {
  (function($) {
    function init() {
      $(this).data('paginate-current', 0);
      goto.apply(this, [0]);
      return this;
    }

    function pages() {
      var perPage = $(this).data('paginate-size') || 10;
      var total = $(this).children().length;
      return Math.ceil(total / perPage);
    }

    function goto(page) {
      var total = pages.apply(this);
      if (page < 0 || page >= total) {
        return;
      }
      var perPage = $(this).data('paginate-size') || 10;
      var start = perPage * page;
      $(this).children().hide()
      .slice(start, start + perPage).fadeIn();
      $(this).data('paginate-current', page)
      .trigger('paginate:current', page);
      return this;
    }

    function next() {
      goto.apply(this, [current.apply(this) + 1]);
    }

    function prev() {
      goto.apply(this, [current.apply(this) - 1]);
    }

    function current() {
      return $(this).data('paginate-current');
    }

    $.fn.paginate = function(action, options) {
      action = action || 'init';
      return this.each(function() {
        switch (action) {
          case 'init':
            return init.apply(this, options);
          case 'pagesf':
            return pages.apply(this, options);
          case 'goto':
            return goto.apply(this, [options]);
          case 'next':
            return next.apply(this, options);
          case 'prev':
            return prev.apply(this, options);
          case 'current':
            return current.apply(this, options);
          default:
            console.error('$.paginate() unknown action: ' + action);
        }
      });
    };
  })(jQuery);
  $('.paginate').paginate();
}

window.WScript = window.WScript || [];
window.WScript.push(initPaginatePlugin);
