import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const FormSheet = ({ currentId, setCurrentId, setForm }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [postData, setPostData] =
        useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })

    const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null)

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId(null)
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        clear()
        setForm(false)
    }

    return (
        <Paper className={classes.paper} elevation={3} >
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography
                    variant='h6' color='primary'>
                    {currentId ?
                        'Edit' : 'Creating'} Your Snap
                    </Typography>
                <TextField
                    name='creator'
                    variant='outlined'
                    label='Creator'
                    color='primary'
                    fullWidth
                    value={postData.creator}
                    onChange={e => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    name='creator'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={e => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name='creator'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    onChange={e => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name='creator'
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        color='secondary'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                    <Button className={classes.buttonSubmit} fullWidth variant='contained' color='primary' size='large' type='submit'>Submit</Button>
                    <Button variant='contained' color='secondary' fullWidth size='small' onClick={clear}>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default FormSheet