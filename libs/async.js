let Async = function (){
   this.map = function (array, func, callback){
        //CODE ICI: array=>images, func=>downloadImage, callback c une callback simple
    
        let count= array.length;
        let errors= [];
        let results= [];
        for(let i = 0; i<array.length; i++){ 
            // ((i)=>{}(i)) est une sécurité on a vu ça au cours sur les fcts si blem revoir le cours
            ((i)=>{
                func(array[i], (err, result)=>{
                    count--;
                    if (err) errors[i]=err;
                    else results[i]=result;
                    if (count < 1) return callback((errors.length > 0) ? errors: null, results);
                });
            })(i);
            
        }
    };

    this.waterFall = function (){
        //CODE ICI
        let self = this;
        let jobs = arguments[0];
        let callback = (arguments.length > 2) ? arguments[2] : arguments [1];

        let job = jobs.shift();

        let after = function (err, result){
            if (err) return callback(err);
            if (jobs.length < 1) return callback (null, result);

            let args = [];
            args.push(jobs);
            if (result !== undefined) args.push(result);
            args.push(function (err, result){
                if (err) return callback(err);
                else return callback (null, result);
            });
            self.asyncWaterfall.apply(this, args);
        };
        let args = [];
        if(arguments.length > 2) args.push(arguments[1]);
        args.push(after);
        job.apply(this, args);
    };
};

module.exports = new Async();