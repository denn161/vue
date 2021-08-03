
const app = new Vue({
    el: '#app',
    data: {
        catalog: [ ],
        search: '',
        isLoading: false,
        spinnerLoading: true,
        error: false,
        cart: [],
        statistic:[],
    },
    methods: {
        addToCart(item) {
            this.cart.push(item);
              fetch('./cart', {
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(item)                
            })
        },
        removeProduct(item) {
            let index = this.cart.indexOf(item);       
            if (index !== -1) {
                this.cart.splice(index, 1);
                  fetch('./cart', {
                method: 'DELETE',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(item)                    
                })                
                fetch('./stat', {
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({id:item.id,name:item.name,type:'delete',date:new Date()})                    
                })
                   
            }
        },
        openBasket() {
            document.querySelector('.basket').classList.toggle('active');
        }        
    },
    computed: {
        searchHandler() {
            return this.catalog.filter(element => {
                return element.name.toLowerCase().includes(this.search);
            });
         } 
    },
    async  mounted() {
       await fetch('./catalog')
            .then((response) => response.json())
            .then((data) => {              
                setTimeout(() => {                 
                    this.catalog = data;
                    this.isLoading = true;
                    this.spinnerLoading = false;

                }, 2000)
            })           
           .catch(error => {          
               this.spinnerLoading = false;
               this.error = true;
               console.log(error.message);                   
           })
        
      await  fetch('/cart')
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                this.cart = body;
            })
       await  fetch('./stat')
            .then((response) => {
                return response.json();
            })
            .then((body) => {
                console.log(body);
            })
      
    }

});


 
    

    
     




 

