document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.medal-select').forEach(select => {
    select.addEventListener('change', async (e) => {
      const userId = e.target.dataset.userid;
      const value = e.target.value;

      if (value === 'yes') {
        await fetch(`/admin/award/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medal: true })
        });
      }
    });
  });
});
