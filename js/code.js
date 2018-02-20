// Navigation funnction to slide menu in from left side
var nav = "open";
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementsByClassName("main")[0].style.marginLeft = "250px";
    nav = "open";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementsByClassName("main")[0].style.marginLeft= "0";
    nav = "closed";
}
function toggleNav() {
		if(nav == "closed") {
			openNav();
		} else {
			closeNav();
		}
}

// Animation to bring main menu in from the left
function myMove() {
	document.getElementsByClassName("ship")[0].style.visibility="hidden";
  document.getElementsByClassName("done")[0].style.visibility="hidden";
	document.getElementsByClassName("main")[0].style.visibility="visible";
  var elem = document.getElementById("animate");
  var pos = -600;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos == 400) {
      clearInterval(id);
    } else {
      pos+=4;
      elem.style.top = 100 + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

// function to populate the items
var subtotal;
function purchase(product) {
	document.getElementsByClassName("main")[0].style.visibility="hidden";
  document.getElementsByClassName("done")[0].style.visibility="hidden";
  document.getElementsByClassName("ship")[0].style.visibility="visible";
  switch(product) {
    case '0':
      subtotal = products[0].price;
      $('#shipItem').html('<h2>'+ products[0].name +'</h2>' +
      '<h4>Sub-Total:</h4><div>$'+ products[0].price +
      '</div><br><h4>Shipping:' + '<div id="shipCost"></div></h4>'+
      '<br><hr><br><h4>Total:' + '<div id="totalCost"></div></h4>');
      break;
    case '1':
      subtotal = products[1].price;
      $('#shipItem').html('<h2>'+ products[1].name +'</h2>' +
      '<h4>Sub-Total:</h4><div>$'+ products[1].price +
      '</div><br><h4>Shipping:' + '<div id="shipCost"></div></h4>'+
      '<br><hr><br><h4>Total:' + '<div id="totalCost"></div></h4>');
      break;
    case '2':
      subtotal = products[2].price;
      $('#shipItem').html('<h2>'+ products[2].name +'</h2>' +
      '<h4>Sub-Total:</h4><div>$'+ products[2].price +
      '</div><br><h4>Shipping:' + '<div id="shipCost"></div></h4>'+
      '<br><hr><br><h4>Total:' + '<div id="totalCost"></div></h4>');
      break;
  };
}

// some form validation before getting to thank you screen
function confirm() {
  // form validation
    $('#valForm').validate({
          rules: {
              name: {
                  required: true
              },
              street: {
                  required: true
              },
              city: {
                  required: true
              },
              state: {
                  required: true,
                  maxlength: 2
              },
              zip: {
                  required: true,
                    minlength: 5,
                    maxlength: 5,
                    digits: true
              }
          }
      });
      var name = $('#name').val();
      var street = $('#street').val();
      var city = $('#city').val();
      var state = $('#state').val();
      var zip = $('#zip').val();
      if(name !== "" && street !== "" && city !== "" && state !== "" && state !== "state" && zip !== "") {
        $('#name').val('');
        $('#street').val('');
        $('#city').val('');
        $('#state').val('');
        $('#zip').val('');
        $(".error").removeClass("error");
         document.getElementsByClassName("main")[0].style.visibility="hidden";
         document.getElementsByClassName("ship")[0].style.visibility="hidden";
         document.getElementsByClassName("done")[0].style.visibility="visible";
  }
}

// function to add shipping based on state chosen
function priceCheck(state) {
  var shipping;
  switch(state) {
    case 'MN':
      shipping = 0;
      break;
    case 'NY':
    case 'CA':
    case 'MA':
      shipping = 7.50;
      break;
    case 'GA':
    case 'AL':
    case 'FL':
      shipping = 3.99;
      break;
    default:
      shipping = 5.99;
      break;
  }
  var totalprice = subtotal + shipping;
  $('#shipCost').html('$'+shipping);
  $('#totalCost').html('$'+totalprice);
}

// function to populate the items on start
var products;
$( document ).ready(function() {
  $.getJSON("http://www.sshado.com/products.json", function(result){
    products = result;
    for(var i = 0; i < 3; i++) {
      $('#item' + i).each(function (index) {
        $('#item' + i).html('<h2>'+ result[i].name +'</h2>' +
        '<h3>$'+ result[i].price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
        '</h3><br><h4>Features:</h4>' +
        '<hr><ul><li>'+ result[i].features[0] +'</li>' +
        '<li>' + result[i].features[1] + '</li>' +
        '<li>' + result[i].features[2] + '</li></ul><br>' +
        '<button id="'+i+'" class="btn btn-success" onClick="purchase(this.id)">Buy</button>');
        })
    };
  });
});
