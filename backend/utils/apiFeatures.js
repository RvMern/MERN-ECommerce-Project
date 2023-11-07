class ApiFeatures {
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }
    // Products Search
    search(){
        const keyword = this.queryStr.keyword ? 
            {
                name:{
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            :
            {};
        this.query = this.query.find({...keyword});
        return this;
    }

    // for filtering the products
    filter(){
        const queryCopy = {...this.queryStr};


        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    // pagination for products page
    pagination(productperpage){
        const currentPage =  Number(this.queryStr.page) || 1;

        const skip = productperpage * (currentPage - 1);

        this.query = this.query.limit(productperpage).skip(skip);
        return this;

    }
}

module.exports = ApiFeatures;