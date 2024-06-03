document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-us__form');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        try {
            const response = await fetch('send.php', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                showModal(successModal);
                form.reset();
            } else {
                showModal(errorModal);
            }
        } catch (error) {
            showModal(errorModal);
        }
    });

    function showModal(modal) {
        modal.style.display = 'block';
        const closeBtns = modal.querySelectorAll('.close, [data-dismiss="modal"]');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
