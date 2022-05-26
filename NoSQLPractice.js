// let newBlog = {
//     createdAt: new Date().toISOString(),
//     title: "New Blog",
//     text: "testing",
//     author: "Jesse",
//     id: String(db.blogposts.count() + 1)
// }

// db.blogposts.insertOne(newBlog);

//  db.blogposts.find({author: "Jesse"})

// db.blogposts.updateOne(
//     {title: "New Blog"},
//     {$set: {title: "New Blog Title"}})

//   db.blogposts.deleteOne(
//     {title: "New Blog Title"})


// const getPosts = (limit, skip, sortField, sortOrder, filterField, filterValue) => {
//     //------trying to get this to work | default variables set here
//     const dbLimit = limit ? limit:50;
//     const dbSkip = skip ? skip:0;
//     const dbSort = sortField && sortOrder ? {[sortField]:sortOrder}:{};
//     const dbFilter = filterField && filterValue ? {[filterField]:filterValue}:{};
    
//     return db.fiftyblogs.find(dbFilter).limit(dbLimit).skip(dbSkip).sort(dbSort).toArray();
    
    //------solution
    // const sortParams = {}
    // sortParams[sortField] = sortOrder
    // const filterParams = {}
    
    // const dbResult = db.fiftyblogs.find(filterParams).limit(limit).skip(skip).sort(sortParams).toArray();
    
    // return dbResult
}

// getPosts("", "", "title", 1, "", "")


const findPost =(blogId) => {
  return db.fiftyblogs.find({id:blogId}).toArray();
}
findPost(7);

const getPostsCollectionLength = () => {
    return db.fiftyblogs.count();
}
getPostsCollectionLength();
}

const makePost = (myTitle, myText, myAuthor, myCategory) => {
    const title = myTitle ? myTitle:"";
    const text = myText ? myText:"";
    const author = myAuthor ? myAuthor:"";
    const category = myCategory ? myCategory:"";
    
    const newBlog = {
        createdAt : new Date().toISOString(),
        title: title,
        text: text,
        author: author,
        category: category,
        lastModified: new Date().toISOString(),
        id: getPostsCollectionLength() +1
    }
    return db.fiftyblogs.insertOne(newBlog)
}

// makePost("New Title", "Testing", "Jesse", "Test category");
// findPost(51) <---it worked!

const updatePost = (myBlogId, myTitle, myText, myAuthor, myCategory) => {
    
    const updateBlog = (findPost(myBlogId[0]));
    
    const title = myTitle ? myTitle: updateBlog.title;
    const text = myText ? myText: updateBlog.text;
    const author = myAuthor ? myAuthor: updateBlog.author;
    const category = myCategory ? myCategory: updateBlog.category;
    
    const blogUpdated = {
        title: title,
        text: text,
        author: author,
        category: category,
        lastModified: new Date()
    }
    
    return db.fiftyblogs.updateOne({id: myBlogId}, {$set: {blogUpdated}})
}

// console.log(findPost(51)[0]); This works -accidentally added blogUpdated to object while figuring it out
// updatePost(51, "New New Title", "This is hard.", "Jesse A", "New Cat.");