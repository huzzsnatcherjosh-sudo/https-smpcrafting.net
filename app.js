// tiny util
const $ = q => document.querySelector(q);

const toast = msg => {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  $('#toast').appendChild(t);
  setTimeout(() => t.remove(), 3000);
};

// localStorage wrapper
const DB = {
  key: 'mcsmp_servers',
  all() { return JSON.parse(localStorage.getItem(this.key) || '[]'); },
  set(list) { localStorage.setItem(this.key, JSON.stringify(list)); },
  add(s) { const l = this.all(); l.push(s); this.set(l); },
  update(id, fn) { const l = this.all(); const i = l.findIndex(x => x.id === id); if (i > -1) { l[i] = fn(l[i]); this.set(l); } },
  remove(id) { this.set(this.all().filter(x => x.id !== id)); }
};

// card component
function Card(srv) {
  const div = document.createElement('div');
  div.className = 'card ' + (srv.status === 'online' ? 'online' : '');
  div.innerHTML = `
    <div>
      <h3>${srv.name}</h3>
      <div class="addr">${srv.address}.smp.mc</div>
      <div class="status">${srv.status} ${srv.playerCount || 0}/20</div>
    </div>
    <div class="actions">
      <button class="btn green" data-start="${srv.id}">${srv.status === 'online' ? 'Restart' : 'Start'}</button>
      <button class="btn grey" data-stop="${srv.id}" ${srv.status !== 'online' ? 'disabled' : ''}>Stop</button>
      <button class="btn" style="background:#b33;" data-del="${srv.id}">Delete</button>
    </div>
  `;
  div.style.animationDelay = (Math.random() * 120) + 'ms';
  return div;
}

function render() {
  const gallery = $('#gallery');
  gallery.innerHTML = '';
  const term = $('#search').value.trim().toLowerCase();
  DB.all()
    .filter(s => term ? s.name.toLowerCase().includes(term) || s.address.toLowerCase().includes(term) : true)
    .forEach(s => gallery.appendChild(Card(s)));
}

// start/stop/delete
document.addEventListener('click', e => {
  const id = e.target.dataset.start || e.target.dataset.stop || e.target.dataset.del;
  if (!id) return;
  e.preventDefault();

  if (e.target.dataset.del) {
    if (!confirm('Delete forever?')) return;
    DB.remove(id);
    toast('Server deleted');
    render();
    return;
  }

  const action = e.target.dataset.start ? 'start' : 'stop';
  const srv = DB.all().find(x => x.id === id);
  if (!srv) return;

  srv.status = action === 'start' ? 'online' : 'offline';
  srv.playerCount = action === 'start' ? Math.floor(Math.random() * 10) + 1 : 0;
  DB.update(id, () => srv);
  toast(action === 'start' ? 'Server started' : 'Server stopped');
  render();
});

// create modal
const modal = $('#modal');
$('#cta').onclick = () => modal.showModal();
$('#cancel').onclick = () => modal.close();

// live suffix preview
$('input[name="address"]').addEventListener('input', e => {
  e.target.setCustomValidity(/^[a-z0-9-]+$/.test(e.target.value) ? '' : 'Only letters, numbers and hyphens');
});

// toggle password
$('input[name="isPublic"]').onchange = e => {
  $('#passLabel').hidden = e.target.checked;
};

// submit
$('#form').onsubmit = e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.address = data.address.toLowerCase();

  if (DB.all().some(s => s.address === data.address)) {
    toast('Address already taken!');
    return;
  }

  const srv = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    address: data.address,
    version: data.version,
    isPublic: data.isPublic === 'on',
    password: data.password || null,
    status: 'offline',
    playerCount: 0,
    createdAt: Date.now()
  };

  DB.add(srv);
  toast('Server created!');
  modal.close();
  e.target.reset();
  render();
};

// search
$('#search').oninput = () => render();

// first paint
render();
