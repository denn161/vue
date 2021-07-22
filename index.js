
const app = new Vue({
    el: '#app',
    data: {
        catalog: [ ],
        search: '',
        isLoading: false,
        spinnerLoading: true,
        error:false,   

    },
    computed: {
        searchHandler() {
            return this.catalog.filter(element => {
                return element.name.toLowerCase().includes(this.search);
            });
         }         

    },
    mounted() {
        fetch('server/catalog.json')
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
    }

});


 
    

    
     




 

