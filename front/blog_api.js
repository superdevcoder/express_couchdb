const url = "http://localhost:3000/api/blog";
const xhr = new XMLHttpRequest();

// Get all blogs
async function getBlogs() {
    xhr.open('GET', url, true)
    xhr.onload = function () {
        const blogs = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(blogs);
            console.log(blogs.rows.length);
            for (var i = 0; i < blogs.rows.length; i++) {
                app.ids.push(blogs.rows[i]['id']);
                app.blogs.push(blogs.rows[i]['value']);
                app.FetchAll();
            }
        } else {
            console.error(blogs);
        }
    }
    xhr.send(null);
}


// Get a blog
function getBlog(id) {
    xhr.open('GET', url + '/' + id, true)
    xhr.onload = function () {
        const blog = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(blog);
        } else {
            console.error(blog);
        }
    }
    xhr.send(null);
}

// Post a blog
function createBlog(title) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        const blog = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(blog);
        } else {
            console.error(blog);
        }
    }
    const newBlog = {title};
    xhr.send(JSON.stringify(newBlog));
}

// Update a blog
function updateBlog(id, title) {
    xhr.open("PUT", url + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        const blog = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(blog);
        } else {
            console.error(blog);
        }
    }
    const updatedBlog = {title};
    xhr.send(JSON.stringify(updatedBlog));
}


// Delete a blog
function deleteBlog(id) {
    xhr.open("DELETE", url + '/' + id, true);
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 204) {
            console.log(response);
        } else {
            console.error(response);
        }
    }
    xhr.send(null);
}