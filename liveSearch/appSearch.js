var searchElem = ':search';
var selectedItems = [];
var input = document.getElementById('autoComplete');

input.oninput = function () {
    searchElem = String(input.value);
    $.ajax({url: 'http://localhost:3005/q/' + searchElem, success: function(result){
        document.getElementById('result').innerHTML = '';

        var ul = document.createElement('ul');
        ul.setAttribute('id', 'list')
        document.getElementById('result').appendChild(ul);

        for (var i = 0; i < result.matches.length; i++){
            var li = document.createElement('li');
            li.setAttribute('tabindex', i+1)
            ul.appendChild(li);
            ul.lastChild.innerHTML = result.matches[i];
        }

        $('input').on('keydown', function (event) {
            if (event.keyCode == 40) {
                $('div.container').on('focus', 'li', function() {
                    $this = $(this);
                    $this.addClass('active').siblings().removeClass();
                    $this.closest('div.container').scrollTop($this.index() * $this.outerHeight());
                }).on('keydown', 'li', function(e) {
                    $this = $(this);
                    if (e.keyCode == 40) {
                        $this.next().focus();
                        return false;
                    } else if (e.keyCode == 38) {
                        $this.prev().focus();
                        return false;
                    }
                }).find('li').first().focus();
            }
        })

        $('li').on('keydown', function (event) {
            if (event.keyCode == 13) {
                selectedItems.push($(this).text());
                $('#selectedItems').html(selectedItems.join(', '));
            }

        })
    }});
};