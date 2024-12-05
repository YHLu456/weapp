import { View } from '@tarojs/components'
import { useState } from 'react'
import {
  AtButton,
  AtForm,
  AtInput,
  AtAccordion,
  AtList,
  AtTag,
  AtTextarea,
  AtSwitch
} from 'taro-ui'
import { useAppDispatch,useAppSelector } from '@/store'
import { contributeResource, getCategoryList, getTagsList } from '@/service/contribute'
import { clearUserInfo } from '@/store/modules/user'
import Taro, { useLoad } from '@tarojs/taro'
import './contribute.scss'

const Contribute = () => {
  //获取Redux中用户名称
  const nickName = useAppSelector(state => state.user.userInfo.nickname)

  const userId = useAppSelector(state => state.user.userInfo.pkId)
  const dispatch = useAppDispatch()


  useLoad(() => {
    if (!userId) {
      Taro.showToast({
        title: '请先登录',
        icon:'none',
      })
      dispatch(clearUserInfo({}))
      setTimeout(() => {
        Taro.navigateTo({
          url:'/pages/login/login',
        })
      },1000)
    } else {
      Promise.all([getTags(),getCategoryListData()])
    }
  })

  //获取标签列表和网盘数据以及资源类型数据
  const [contributeTypeList, setContributeTypeList] = useState<{
    tagList: CategoryType[]
    panList: CategoryType[]
    resourceList:CategoryType[]
  }>({
    tagList: [],
    panList: [],
    resourceList:[],
  })

  //投稿表单数据
  const [contributeForm, setContributeForm] = useState<ContributeForm>({
    title: '',
    isTop: 1,
    downloadUrl: '',
    price: 0,
    detail: '',
    tags: [],
    diskType: null,
    resType: [],
  });

  const [tagOpen, setTagOpen] = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [panType, setPanType] = useState<null | CategoryType>(null)

  const getTags = async () => {
    const res = await getTagsList()
    if (res.code === 0) {
      res.data.forEach(item => {
        item.inverted = false
      })

      setContributeTypeList(prev => ({
        ...prev,
        tagList: res.data,
      }))
    }
  }

  const getCategoryListData = async () => {
    const res = await getCategoryList()
    if (res.code === 0) {
      const resourceList = res.data
        .filter(item => item.type === 1)
        .map(item => {
          item.inverted = false
          return item
        })
      setContributeTypeList(prev => ({
        ...prev,
        panList: res.data.filter(item => item.type === 0),
        resourceList: resourceList,
      }))
    }
  }

  useLoad(() => {
    Promise.all([getTags(), getCategoryListData()])
  })

  const handleSubmitClick = async () => {
    if (!contributeForm.title || !contributeForm.downloadUrl || !contributeForm.price) {
      return Taro.showToast({
        title: '请填写完整信息',
        icon:'none',
      })
    }
    const res = await contributeResource(contributeForm)

    if (res.code === 0) {
      Taro.showToast({
        title: '投稿成功',
        icon:'success',
      })
      clearForm()
    } else {
      Taro.showToast({
        title: '投稿失败',
        icon:'success',
      })
    }
  }


  const clearForm = () => {
    setContributeForm({
      title: '',
      isTop: 1,
      downloadUrl: '',
      price: 0,
      detail: '',
      tags: [],
      diskType: null,
      resType:[],
    })
    setPanType(null)
    setContributeTypeList(pre => {
      return {
        ...pre,
        resourceList: pre.resourceList.map(item => {
          item.inverted = false
          return item
        }),
      }
    })
  }

  const handleUrlChange = (e) => {
    setContributeForm({ ...contributeForm, downloadUrl: e })
    const reg = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    if (!reg.test(contributeForm.downloadUrl) || contributeForm.downloadUrl === '') {
      Taro.showToast({
        title: '请输入正确的链接',
        icon:'none',
      })
      return
    }
    let pan = findPanType(contributeForm.downloadUrl, contributeTypeList.panList)
    if (!pan) {
      pan = contributeTypeList.panList.find(item => item.title === '其他网盘')!
    }
    setPanType(pan)
    setContributeForm(prev => ({ ...prev, diskType: pan!.pkId || 0 }))
  };


  const findPanType = (value: string, list: CategoryType[]) => {
    console.log(value, list, 'find')
    return list.find(item => value.includes(item.description as string))
  }

  const setResourceInverted = (item: CategoryType) => {
    updateItemInverted(item,'tags')
  };


  const setTagsInverted = (item: CategoryType) => {
    updateItemInverted(item, 'resType')
  }

  const updateItemInverted = (item: Tag | CategoryType, type: string) => {
    const targetArray = type === 'tags' ? contributeForm.tags : contributeForm.resType
    const maxSelection = 3
    if (targetArray.length >= maxSelection && !item.inverted) {
      Taro.showToast({
        title: '最多选择3个标签',
        icon:'none',
      })
      return
    }
    item.inverted = !item.inverted

    const pkId = item.pkId
    if (item.inverted) {
      targetArray.push(pkId)
    } else {
      const index = targetArray.findIndex(tag => tag === pkId)
      targetArray.splice(index,1)
    }
    setContributeForm(prev => ({...prev,[type]:targetArray}))
  }



  return (
    <>
      <View className='contribute'>
        <AtForm onSubmit={handleSubmitClick}>
          <AtInput
            name='value'
            title='用户昵称'
            type='text'
            placeholder='请输入用户昵称'
            value={nickName}
            disabled
          />
          <AtInput
            name='title'
            title='标题'
            type='text'
            required
            placeholder='请输入标题'
            value={contributeForm.title}
            onChange={(e) => setContributeForm({ ...contributeForm, title: e + '' })}
          />
          <AtSwitch title='是否置顶' checked={contributeForm.isTop === 1 ? true : false} onChange={e => setContributeForm({ ...contributeForm, isTop: e === true ? 1 : 0 })} />
          <AtInput
            name='value'
            title='下载链接'
            type='text'
            required
            placeholder='请输入下载链接'
            value={contributeForm.downloadUrl}
            onChange={(e) => handleUrlChange(e)}
          />

      <AtInput
        name='value'
        title='网盘类型'
        type='text'
        disabled
        placeholder='请输入网盘类型'
        value={panType === null ? '请选择网盘类型' : panType?.title}
      />
      <AtInput
        name='price'
        title='积分'
        type='number'
        required
        placeholder='请输入积分'
        value={contributeForm.price + ''}
        onChange={e => setContributeForm({ ...contributeForm, price: +e })}
      />
      <View className='detail-box'>
        <View className='detail-text'>资源描述</View>
        <AtTextarea
          className='detail-textarea'
          placeholder='请输入详细描述'
          maxLength={200}
          value={contributeForm.detail}
          onChange={(e) => setContributeForm({ ...contributeForm, detail: e + '' })}
        />
      </View>
      <AtAccordion
        open={tagOpen}
        onClick={() => setTagOpen(!tagOpen)}
        title='标签'
      >
            <AtList hasBorder>
              {contributeTypeList.tagList.map(item => (
              <AtTag
                name={item.title}
                active={item.inverted}
                customStyle={{ margin: '5px 2px 10px 0' }}
                key={item.pkId}
                onClick={() => setTagsInverted(item)}
              >
                {item.title}
              </AtTag>
              ))}
        </AtList>
      </AtAccordion>
      <AtAccordion
        open={resourceOpen}
        onClick={() => setResourceOpen(!resourceOpen)}
        title='资源类型'
      >
        <AtList hasBorder>
          {contributeTypeList.resourceList.map(item => (
            <AtTag
              name={item.title}
              active={item.inverted}
              customStyle={{ margin: '5px 10px 10px 0' }}
              key={item.pkId}
              circle
              type='primary'
              onClick={() => setResourceInverted(item)}
            >
              {item.title}
            </AtTag>
          ))}
        </AtList>
          </AtAccordion>
          </AtForm>
        <AtButton formType='submit' circle type='primary' customStyle={{ marginTop: '20px' }} onClick={handleSubmitClick}>提交</AtButton>
        </View>
    </>
  )
}

export default Contribute;
