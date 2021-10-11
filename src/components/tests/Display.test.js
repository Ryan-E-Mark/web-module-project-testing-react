import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display';
import fetchShow from './../../api/fetchShow';

jest.mock('./../../api/fetchShow');

const testShow = {
    name: '',
    summary: '',
    seasons: [
        {
            episodes: [],
            id: 12,
            name: 'One',
        },
        {
            episodes: [],
            id: 123,
            name: 'Two',
        },
        {
            episodes: [],
            id: 31,
            name: 'Three',
        }
    ],
}


test('Test that the Display component renders without any passed in props.', () => {
    render(<Display />);
})

test('Test that when the fetch button is pressed, the show component will display.', async () => {
    //Arrange
    fetchShow.mockResolvedValueOnce(
        testShow
    )

    render(<Display />);

    
    //Act
    const button = screen.queryByRole("button");
    userEvent.click(button);
    //Assert
    const shows = await screen.findByTestId(/show-container/i)
    expect(shows).toBeInTheDocument();
})

test('Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async () => {
    //Arrange
    fetchShow.mockResolvedValueOnce(
        testShow
    )

    render(<Display />)
    //Act
    const button = screen.queryByRole("button");
    userEvent.click(button);
    //Assert
    await waitFor(() => {
        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(3);
    })
})

test('Test that when the fetch button is pressed, this function is called.', async () => {
    //Arrange
    const displayFuncMock = jest.fn();

    fetchShow.mockResolvedValueOnce(
        testShow
    )

    render(<Display displayFunc={displayFuncMock}/>);
    //Act
    const button = screen.queryByRole("button");
    userEvent.click(button);
    
    await waitFor(() => {
        expect(displayFuncMock).toBeCalledTimes(1);
    })
})





///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.