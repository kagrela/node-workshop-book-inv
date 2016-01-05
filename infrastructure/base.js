module.exports = {
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: { TEST_ENV_VAR: 'whatever'},
    addons: { mongolab: { plan: 'mongolab:sandbox' } },
    collaborators: [ 'kamil@plan3.se', 'plan3-labs@herokumanager.com' ],
    features: {
        'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false }
    },
    log_drains: []
};
