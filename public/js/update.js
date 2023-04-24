
const updateHandler = async (event) => {
  event.preventDefault();


  const title = document.querySelector('#titleTextarea1').value.trim();
  const content = document.querySelector('#contentTextarea1').value.trim();
  const blogIdEl1 = document.querySelector('#blogId');
  const blogId = blogIdEl1.getAttribute('data-id');


  if (title && content) {
  
    const response = await fetch('/dashboard/blog/create', {
      method: 'PUT',
      body: JSON.stringify({ title, content, blogId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

  
const deleteHandler = async (event) => {
  event.preventDefault();

  const blogIdEl1 = document.querySelector('#blogId');
  const blogId = blogIdEl1.getAttribute('data-id');

  
    const response = await fetch('/dashboard/blog/update', {
      method: 'DELETE',
      body: JSON.stringify({ blogId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};


document
  .querySelector('#updatePost')
  .addEventListener('click', updateHandler);


document
  .querySelector('#deletePost')
  .addEventListener('click', deleteHandler);