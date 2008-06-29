////
// simple hotkeys plugin.
// 
//   <a href="link" hotkey="a">all</a>
//
//   $.hotkey('a', function() { window.location = 'somewhere' })
//
//   $.hotkeys({
//     'a': function() { window.location = 'somewhere' },
//     'b': function() { alert('something else') }
//   })
//
(function($) {
  $.hotkeys = function(options) {
    for(key in options) $.hotkey(key, options[key])
    return this
  }

  // accepts a function or url
  $.hotkey = function(key, value) {
	  key = key.charCodeAt(0)
		key = ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) ? key : (key - 32)
    $.hotkeys.cache[key] = value
    return this
  }
  
  $.hotkeys.cache = {}
})(jQuery)

jQuery(document).ready(function($) {  
  $('a[hotkey]').each(function() {
    $.hotkey($(this).attr('hotkey'), $(this).attr('href'))
  })

  $(document).bind('keydown.hotkey', function(e) {
    // don't hotkey when typing in an input
    if ($(e.target).is(':input')) return
    // no modifiers supported 
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return true
    var el = $.hotkeys.cache[e.keyCode]
    if (el) $.isFunction(el) ? el.call(this) : window.location = el
  })
});
