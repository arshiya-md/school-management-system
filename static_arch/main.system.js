const layers = {
    school: {
        _default: { noOneCan: 'create', ownerCan: 'audit' },  // Only superadmins can create schools
        _public: { anyoneCan: 'read' },  // School basic info is readable
        _private: { anyoneCan: 'none' }, // Private school data is restricted

        classroom: {
            _default: { inherit: true },  // Inherit permissions from school
            _public: { anyoneCan: 'read' },
            _private: { anyoneCan: 'none' },

            student: {
                _default: { inherit: true },  // Inherit permissions from classroom
                _public: { anyoneCan: 'none' },  // Student data is private by default
                _private: { inherit: true }
            }
        }
    }
}

const actions = {
    blocked: -1,
    none: 1,
    read: 2,
    write: 3,
    create: 4,
    transfer: 5,
    audit: 6,
    admin: 7
}

module.exports = {
    layers,
    actions
}