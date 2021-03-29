let servers = [
    { id: '1', name: 'AWS', status: 'working' },
    { id: '2', name: 'Google Cloud', status: 'working' },
    { id: '3', name: 'Yandex Cloud', status: 'working' },
    { id: '4', name: 'Microsoft', status: 'working' },
];

export const getAll = (req, res) => {
    res.render('pug_page2', {
        title: 'Hey Pug2',
        message: 'Hello there!!!',
        emails: ['XXgavgav@mycorp.com', 'XXmioaw@mycorp.com'],
        servers: servers,
    });
};
