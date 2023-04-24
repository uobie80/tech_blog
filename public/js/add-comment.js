const addCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#contentTextarea1').value.trim();
 
      console.log(JSON.stringify({comment}));

    if (comment) {
      const response = await fetch('/add-comment', { 
        method: 'POST', 
        body: JSON.stringify({comment}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        alert(response.statusText);
      }
    } 
  };


  document
  .querySelector('.add-comment-form')
  .addEventListener('submit', addCommentFormHandler);