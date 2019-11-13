var items = document.querySelectorAll('.sorting-list-item')
var params = { bubbles: true, cancelable: false, detail:{}}

items.forEach(function(item){
   item.addEventListener('click', function(e){
        //daha önce seçilmiş element varsa tespit edilir.
        var active = document.querySelector('.active')
        
        // event teki element tespit edilir ve gerekli değişiklikler yapılır.
        var elem = e.currentTarget
        !isActive(elem) ? elem.classList.toggle('active'): ''
        elem.classList.toggle('up')
        params.detail['sortingType']= elem.attributes.data.nodeValue
       
       // Eğer önceki aktif element varsa ve seçilen yeni elemen değil ise önceki aktif element pasif duruma getirilir.
        if(active && active != elem) active.classList.remove('active','up')
 
        //Event başlatılır.
        params.detail['direction']= direction(elem)
        var event = new CustomEvent('sortingChanged',params)
        elem.dispatchEvent(event)
   })
})
document.getElementById('listing-type').addEventListener('click',function(e){
    var elem = e.currentTarget
    var direction= 'horizantal' //Daha önce seçim yok ise yatay
    
    if(elem.classList.contains(direction)) direction = 'vertical'  
    elem.classList.remove('horizantal','vertical')
    elem.classList.add(direction)
 
    params.detail= direction
    var event = new CustomEvent('listingChanged',params)
    elem.dispatchEvent(event)
})

function isActive(elem){ return elem.classList.contains('active')}
function direction(elem){ return elem.classList.contains('up') ? 'ASC' : 'DESC'}