import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import ManageAnimes from '../../../ManageAnimes';

export default function AnimesContainer() {
    return (
        <>
            <ManageAnimes />
        </>
    )
}